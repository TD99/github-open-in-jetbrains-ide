const STORAGE_KEY = "background-color";

(function () {
  const params = new URLSearchParams(location.search);
  const bgParam = params.get("background-color");

  if (bgParam) {
    const decoded = decodeURIComponent(bgParam);
    if (isValidHex(decoded)) {
      sessionStorage.setItem(STORAGE_KEY, decoded);

      // Reload without query params
      const cleanUrl = new URL(location.href);
      cleanUrl.search = "";
      location.replace(cleanUrl.toString());
    }
  } else {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved && isValidHex(saved)) {
      applyColor(saved);
    }
  }
})();
