document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");

  function openTab(tabName) {
    tabs.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabName));
    panels.forEach(panel => panel.classList.toggle("active", panel.id === tabName));
  }

  // Handle tab clicks
  tabs.forEach(btn => {
    btn.addEventListener("click", () => openTab(btn.dataset.tab));
  });
});
