function inject(tabId) {
  browser.tabs.executeScript(tabId, { file: "content.js" });
}

// عند الضغط على الأيقونة – تشغيل يدوي
browser.browserAction.onClicked.addListener(tab => {
  inject(tab.id);
});

// تشغيل تلقائي إذا الموقع موجود في القائمة
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url) return;

  browser.storage.local.get("autoSites").then(data => {
    const sites = data.autoSites || [];

    // مقارنة url مع أي عنصر في القائمة
    if (sites.some(site => tab.url.includes(site))) {
      inject(tabId);
    }
  });
});
