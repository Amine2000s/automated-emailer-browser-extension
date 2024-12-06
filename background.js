// Ensure we're using the correct 'browser' API, which is standard for Firefox.
browser.browserAction.onClicked.addListener(function() {
    // Open a new tab when the user clicks on the extension icon
    browser.tabs.create({
      url: "/pop-up/emailer.html"  // Replace with your desired URL or local file path
    });
  });
  