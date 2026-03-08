# Tracer Bullet Edits

 - [x] When loading the extension, I get 'audioCapture' is only allowed for packaged apps, but this is a extension. So, I suspect we need to handle getting audio in a different way. (Removed 'audioCapture' and using getUserMedia in offscreen document).
 - [x] In Keyboard shortcuts, both Activate the extension and Activate/Deactivate Voice Assistant show "Not set" for the shortcut. Both also are set to "In Chrome", but we want them to be global. (Using custom commands with 'global: true' and 'suggested_key' provided for both).
 - [x] The options page is a bit bare - we should add a header, information, instructions, a link to the README, and style a little bit more nicely. Make sure we include detailed instructions with a link for how to get the API key. (Added styling, info box, instructions, and GitHub links).
