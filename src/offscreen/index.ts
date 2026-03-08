// Constants
const MODEL = 'models/gemini-2.0-flash-exp';
const ENDPOINT = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

let socket: WebSocket | null = null;
let audioContext: AudioContext | null = null;
let microphoneStream: MediaStream | null = null;
let microphoneProcessor: ScriptProcessorNode | null = null;

// Audio parameters
const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

async function start() {
  const { apiKey } = await chrome.storage.sync.get('apiKey');
  if (!apiKey) {
    console.error('API Key not found in storage.');
    return;
  }

  socket = new WebSocket(`${ENDPOINT}?key=${apiKey}`);

  socket.onopen = () => {
    console.log('WebSocket connected.');
    sendSetup();
    startMicrophone();
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleServerMessage(data);
  };

  socket.onclose = () => {
    console.log('WebSocket closed.');
    stopMicrophone();
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  audioContext = new AudioContext({ sampleRate: INPUT_SAMPLE_RATE });
  playStartTone();
}

function sendSetup() {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  const setupMessage = {
    setup: {
      model: MODEL,
      generationConfig: {
        responseModalities: ['audio'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Aoide', // Standard voice
            },
          },
        },
      },
    },
  };

  socket.send(JSON.stringify(setupMessage));
}

async function startMicrophone() {
  try {
    microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!audioContext) return;

    const source = audioContext.createMediaStreamSource(microphoneStream);
    // ScriptProcessorNode for simplicity in tracer bullet
    microphoneProcessor = audioContext.createScriptProcessor(4096, 1, 1);

    microphoneProcessor.onaudioprocess = (event) => {
      const inputData = event.inputBuffer.getChannelData(0);
      const pcm16Data = float32ToPcm16(inputData);
      const base64Data = arrayBufferToBase64(pcm16Data.buffer as ArrayBuffer);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          realtimeInput: {
            mediaChunks: [
              {
                mimeType: 'audio/pcm;rate=16000',
                data: base64Data,
              },
            ],
          },
        }));
      }
    };

    source.connect(microphoneProcessor);
    microphoneProcessor.connect(audioContext.destination);
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
}

function stopMicrophone() {
  if (microphoneStream) {
    microphoneStream.getTracks().forEach((track) => track.stop());
    microphoneStream = null;
  }
  if (microphoneProcessor) {
    microphoneProcessor.disconnect();
    microphoneProcessor = null;
  }
}

function handleServerMessage(message: any) {
  if (message.serverContent && message.serverContent.modelTurn) {
    const parts = message.serverContent.modelTurn.parts;
    for (const part of parts) {
      if (part.inlineData && part.inlineData.mimeType === 'audio/pcm;rate=24000') {
        const base64Audio = part.inlineData.data;
        const pcm16Data = base64ToArrayBuffer(base64Audio);
        playAudio(pcm16Data);
      }
    }
  }
  if (message.serverContent && message.serverContent.interrupted) {
    // Stop current playback if interrupted
    // (Implementation omitted for tracer bullet)
  }
}

function playAudio(pcm16Data: ArrayBuffer) {
  if (!audioContext) return;

  const float32Data = pcm16ToFloat32(new Int16Array(pcm16Data));
  const audioBuffer = audioContext.createBuffer(1, float32Data.length, OUTPUT_SAMPLE_RATE);
  audioBuffer.getChannelData(0).set(float32Data);

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}

// Utility functions
function float32ToPcm16(float32Array: Float32Array): Int16Array {
  const pcm16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i] ?? 0));
    pcm16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return pcm16Array;
}

function pcm16ToFloat32(pcm16Array: Int16Array): Float32Array {
  const float32Array = new Float32Array(pcm16Array.length);
  for (let i = 0; i < pcm16Array.length; i++) {
    float32Array[i] = (pcm16Array[i] ?? 0) / 0x8000;
  }
  return float32Array;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i] ?? 0);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function playStartTone() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.2);
}

function playStopTone() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.2);
}

chrome.runtime.onMessage.addListener((message: { type: string }, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === 'STOP_TONE') {
    playStopTone();
    sendResponse({ success: true });
  }
});

// Initialize
start();
