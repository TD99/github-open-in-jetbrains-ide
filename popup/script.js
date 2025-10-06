document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");

  function openTab(tabName) {
    tabs.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabName));
    panels.forEach(panel => panel.classList.toggle("active", panel.id === tabName));
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => openTab(btn.dataset.tab));
  });

  function displayVersion() {
    const version = chrome.runtime.getManifest().version;
    const versionElement = document.getElementById("version");
    const versionNumberElement = document.getElementById("version-number");

    if (version) {
      versionElement.style.display = "block";
      versionNumberElement.textContent = version;
    }
  }

  displayVersion();

  function displayDescription() {
    const description = chrome.runtime.getManifest().description;
    const descriptionElement = document.getElementById("description");

    if (description) {
      descriptionElement.textContent = description;
    }
  }

  displayDescription();

  function linkHomepage() {
    const homepage = chrome.runtime.getManifest().homepage_url;
    const homepageElement = document.getElementById("project-homepage");
    homepageElement.href = homepage;
  }

  linkHomepage();
});
