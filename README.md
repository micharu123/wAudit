# wAudit
Pronounced wäˈôdit/

This Google Chrome Extension provides granular control over background threads known as web workers. This extension is currently in development. To install the extension:

+ Navigate to chrome://extensions in your Google Chrome web browser.
+ Click the Developer mode checkbox at the top right hand corner of the page.
+ Click the Load unpacked extension... button below the Developer Mode checkbox.
+ Navigate to the wAudit extension folder and Click select.

wAudit is now enabled. You will notice that webpages load a bit slower. This is because we recursively search all keys of the JavaScript global oject to find web workers. 
