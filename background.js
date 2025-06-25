chrome.contextMenus.create({
  id: "lookup-word",
  title: "Look up '%s'",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "lookup-word") {
    chrome.tabs.create({ 
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${info.selectionText}`
    });
  }
});