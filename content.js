// noinspection JSIgnoredPromiseFromCall

let buttonCounter = 0;

const IDE_ICON_DIR = "./assets/jetbrains/";
const SUPPORTED_IDE_LIST = [
  {id: "idea", name: "IntelliJ IDEA", icon_dark: "idea_dark.svg", icon_light: "idea_light.svg"},
  {id: "pycharm", name: "PyCharm", icon_dark: "pycharm_dark.svg", icon_light: "pycharm_light.svg"},
  {id: "webstorm", name: "WebStorm", icon_dark: "webstorm_dark.svg", icon_light: "webstorm_light.svg"},
  {id: "phpstorm", name: "PhpStorm", icon_dark: "phpstorm_dark.svg", icon_light: "phpstorm_light.svg"},
  {id: "rubymine", name: "RubyMine", icon_dark: "rubymine_dark.svg", icon_light: "rubymine_light.svg"},
  {id: "clion", name: "CLion", icon_dark: "clion_dark.svg", icon_light: "clion_light.svg"},
  {id: "goland", name: "GoLand", icon_dark: "goland_dark.svg", icon_light: "goland_light.svg"},
  {id: "rider", name: "Rider", icon_dark: "rider_dark.svg", icon_light: "rider_light.svg"},
  {id: "datagrip", name: "DataGrip", icon_dark: "datagrip_dark.svg", icon_light: "datagrip_light.svg"},
];

function getIconUrl(iconPath) {
  try {
    if (chrome?.runtime?.getURL) {
      return chrome.runtime.getURL(iconPath);
    }
  } catch (e) {
    console.warn("chrome.runtime.getURL not available, fallback:", e);
  }
  return iconPath;
}

function getDefaultIDE() {
  return new Promise((resolve) => {
    try {
      if (chrome?.storage?.sync) {
        chrome.storage.sync.get({defaultIde: "idea"}, (result) => {
          resolve(result.defaultIde);
        });
      } else {
        resolve(localStorage.getItem("defaultIde") || "idea");
      }
    } catch (e) {
      console.warn("Storage not available, using fallback", e);
      resolve(localStorage.getItem("defaultIde") || "idea");
    }
  });
}

function setDefaultIDE(ide) {
  try {
    if (chrome?.storage?.sync) {
      chrome.storage.sync.set({defaultIde: ide});
    } else {
      localStorage.setItem("defaultIde", ide);
    }
  } catch (e) {
    console.warn("Storage not available, fallback", e);
    localStorage.setItem("defaultIde", ide);
  }
}

function buildUri(ideId, repoUrl) {
  return `jetbrains://${ideId}/checkout/git?checkout.repo=${encodeURIComponent(repoUrl)}`;
}

function createActionButton(label, onClick, extraClass = "", iconPath = null) {
  const id = `idea-${buttonCounter++}`;
  const labelId = `${id}--label`;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = id;
  btn.tabIndex = 0;
  btn.setAttribute("aria-labelledby", labelId);
  btn.setAttribute("data-size", "medium");
  btn.className = `open-with-jetbrains-ide-btn ${extraClass}`;

  const spacer = document.createElement("span");
  spacer.className = "open-with-jetbrains-ide-spacer";
  btn.appendChild(spacer);

  if (iconPath) {
    const iconWrapper = document.createElement("span");
    iconWrapper.className = "open-with-jetbrains-ide-icon";
    const icon = document.createElement("img");
    icon.src = getIconUrl(iconPath);
    icon.alt = "Icon of " + label;
    icon.width = 16;
    icon.height = 16;
    iconWrapper.appendChild(icon);
    btn.appendChild(iconWrapper);
  }

  const labelWrapper = document.createElement("span");
  labelWrapper.className = "open-with-jetbrains-ide-subcontent";
  labelWrapper.setAttribute("data-component", "ActionList.Item--DividerContainer");

  const labelSpan = document.createElement("span");
  labelSpan.className = "open-with-jetbrains-ide-label";
  labelSpan.id = labelId;
  labelSpan.textContent = label;

  labelWrapper.appendChild(labelSpan);
  btn.appendChild(labelWrapper);

  if (onClick) {
    btn.addEventListener("click", onClick);
  }

  return btn;
}

async function addIdeButtons(container, repoUrl) {
  if (!container || container.querySelector(".open-with-jetbrains-ide-item"))
    return;

  const defaultIde = await getDefaultIDE();
  const ideData = SUPPORTED_IDE_LIST.find((i) => i.id === defaultIde);

  // list item
  const li = document.createElement("li");
  li.className = "open-with-jetbrains-ide-item";
  li.setAttribute("data-has-description", "false");

  // wrapper for split button
  const wrapper = document.createElement("div");
  wrapper.className = "open-with-jetbrains-ide-split";

  // main button (default IDE)
  const mainBtn = createActionButton(
    `Open with ${ideData.name}`,
    () => window.location.href = buildUri(defaultIde, repoUrl)
  );
  wrapper.appendChild(mainBtn);

  // overflow button (chevron)
  const overflowBtn = createActionButton("▾", () => openIdeModal(repoUrl));
  overflowBtn.classList.add("open-with-jetbrains-ide-overflow");
  wrapper.appendChild(overflowBtn);

  li.appendChild(wrapper);

  // insert before Download ZIP
  const list = container.querySelector("div > ul");
  if (list && list.lastElementChild) {
    list.insertBefore(li, list.lastElementChild);
  }
}

function getGitHubBackgroundColor() {
  const documentRoot = document.documentElement;

  let githubBackground = getComputedStyle(documentRoot).getPropertyValue("--bgColor-default");
  if (!githubBackground) {
    githubBackground = getComputedStyle(documentRoot).getPropertyValue("--color-canvas-default");
  }

  return githubBackground;
}

function isGitHubBackgroundColorDark() {
  const colorStr = getGitHubBackgroundColor();
  if (!colorStr || !colorStr.startsWith("#")) return false;

  const hex = colorStr.slice(1);

  let r, g, b;
  if (hex.length === 3) {
    // short form #rgb
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // full form #rrggbb
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    return false; // unsupported HEX format
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

function openIdeModal(repoUrl) {
  if (document.querySelector(".open-with-jetbrains-ide-modal")) return;

  const overlay = document.createElement("div");
  overlay.className = "open-with-jetbrains-ide-modal-overlay";

  const modal = document.createElement("div");
  modal.className = "open-with-jetbrains-ide-modal";

  const title = document.createElement("h3");
  title.textContent = "Select the IDE to open with";
  modal.appendChild(title);

  SUPPORTED_IDE_LIST.forEach((ide) => {
    const btn = createActionButton(
      `Open with ${ide.name}`,
      () => {
        setDefaultIDE(ide.id);
        overlay.remove();
        window.location.href = buildUri(ide.id, repoUrl);
      },
      "",
      IDE_ICON_DIR + (isGitHubBackgroundColorDark() ? ide.icon_light : ide.icon_dark)
    );
    modal.appendChild(btn);
  });

  const note = document.createElement("p");
  note.className = "open-with-jetbrains-ide-note";
  note.textContent =
    "If this repository was already cloned in a JetBrains IDE, that IDE will be chosen automatically.";
  modal.appendChild(note);

  const licenseLink = document.createElement("a");
  licenseLink.className = "open-with-jetbrains-ide-license";
  licenseLink.textContent = "License";
  licenseLink.href = chrome.runtime.getURL("pages/license/index.html") + "?background-color=" + encodeURIComponent(getGitHubBackgroundColor());
  licenseLink.target = "_blank";
  licenseLink.rel = "noopener noreferrer";
  modal.appendChild(licenseLink);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

function handleNode(node) {
  if (!(node instanceof HTMLDivElement)) return;

  let container =
    node.classList?.contains("react-overview-code-button-action-list")
      ? node
      : node.querySelector(".react-overview-code-button-action-list") ??
      node.closest(".react-overview-code-button-action-list");
  if (!container) return;

  const linkInput = container.querySelector("input#clone-with-https");
  if (!linkInput) return;

  const repoLink = linkInput.value.trim();
  if (!repoLink) return;

  addIdeButtons(container, repoLink);
}

function observeCloneDropdown() {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(handleNode);
    }
  });
  observer.observe(document.body, {childList: true, subtree: true});
}

function handleLoaded() {
  const container = document.querySelector(".react-overview-code-button-action-list");
  if (container) {
    handleNode(container);
  }
}

if (/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(window.location.href)) {
  console.info("GitHub to JetBrains IDE Extension active.");
  addEventListener("load", () => handleLoaded());
  observeCloneDropdown();
}