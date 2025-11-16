const input = document.getElementById("siteInput");
const addBtn = document.getElementById("addBtn");
const siteList = document.getElementById("siteList");

// تحميل القائمة
function loadSites() {
  browser.storage.local.get("autoSites").then(data => {
    const sites = data.autoSites || [];
    siteList.innerHTML = "";

    sites.forEach(site => {
      const li = document.createElement("li");
      li.textContent = site;

      const del = document.createElement("button");
      del.textContent = "Remove";
      del.style.marginLeft = "10px";

      del.onclick = () => {
        removeSite(site);
      };

      li.appendChild(del);
      siteList.appendChild(li);
    });
  });
}

// إضافة موقع
function addSite() {
  const site = input.value.trim();
  if (!site) return;

  browser.storage.local.get("autoSites").then(data => {
    const sites = data.autoSites || [];

    if (!sites.includes(site)) {
      sites.push(site);
      browser.storage.local.set({ autoSites: sites }).then(() => {
        input.value = "";
        loadSites();
      });
    }
  });
}

// حذف موقع
function removeSite(site) {
  browser.storage.local.get("autoSites").then(data => {
    let sites = data.autoSites || [];
    sites = sites.filter(item => item !== site);
    browser.storage.local.set({ autoSites: sites }).then(loadSites);
  });
}

addBtn.onclick = addSite;

// تشغيل الصفحة
loadSites();
