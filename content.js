// noinspection JSIgnoredPromiseFromCall

let buttonCounter = 0;

const SUPPORTED_IDE_LIST = [
  {id: "idea", name: "IntelliJ IDEA", icon: "./assets/jetbrains/idea.svg"},
  {id: "pycharm", name: "PyCharm", icon: "./assets/jetbrains/pycharm.svg"},
  {id: "webstorm", name: "WebStorm", icon: "./assets/jetbrains/webstorm.svg"},
  {id: "phpstorm", name: "PhpStorm", icon: "./assets/jetbrains/phpstorm.svg"},
  {id: "rubymine", name: "RubyMine", icon: "./assets/jetbrains/rubymine.svg"},
  {id: "clion", name: "CLion", icon: "./assets/jetbrains/clion.svg"},
  {id: "goland", name: "GoLand", icon: "./assets/jetbrains/goland.svg"},
  {id: "rider", name: "Rider", icon: "./assets/jetbrains/rider.svg"},
  {id: "datagrip", name: "DataGrip", icon: "./assets/jetbrains/datagrip.svg"},
];

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

function createActionButton(label, onClick, extraClass = "") {
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

  const labelWrapper = document.createElement("span");
  labelWrapper.className = "open-with-jetbrains-ide-subcontent";
  labelWrapper.setAttribute(
    "data-component",
    "ActionList.Item--DividerContainer",
  );

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
  const mainBtn = createActionButton(`Open with ${ideData.name}`, () => {
    window.location.href = buildUri(defaultIde, repoUrl);
  });
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
    const btn = createActionButton(`Open with ${ide.name}`, () => {
      setDefaultIDE(ide.id);
      overlay.remove();
    });
    btn.addEventListener("click", () => {
      window.location.href = buildUri(ide.id, repoUrl);
    });
    modal.appendChild(btn);
  });

  const note = document.createElement("p");
  note.className = "open-with-jetbrains-ide-note";
  note.textContent =
    "If this repository was already cloned in a JetBrains IDE, that IDE will be chosen automatically.";
  modal.appendChild(note);

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