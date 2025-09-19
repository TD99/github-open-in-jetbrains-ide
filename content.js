// noinspection JSIgnoredPromiseFromCall

let buttonCounter = 0;

const SUPPORTED_IDE_LIST = [
  {id: "idea", name: "IntelliJ IDEA"},
  {id: "pycharm", name: "PyCharm"},
  {id: "webstorm", name: "WebStorm"},
  {id: "phpstorm", name: "PhpStorm"},
  {id: "rubymine", name: "RubyMine"},
  {id: "clion", name: "CLion"},
  {id: "goland", name: "GoLand"},
  {id: "rider", name: "Rider"},
  {id: "appcode", name: "AppCode"},
  {id: "datagrip", name: "DataGrip"},
  {id: "dataspell", name: "DataSpell"},
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
  btn.className = `open-in-intellij-btn ${extraClass}`;

  const spacer = document.createElement("span");
  spacer.className = "open-in-intellij-spacer";
  btn.appendChild(spacer);

  const labelWrapper = document.createElement("span");
  labelWrapper.className = "open-in-intellij-subcontent";
  labelWrapper.setAttribute("data-component", "ActionList.Item--DividerContainer");

  const labelSpan = document.createElement("span");
  labelSpan.className = "open-in-intellij-label";
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
  if (!container || container.querySelector(".open-in-intellij-item")) return;

  const defaultIde = await getDefaultIDE();
  const ideData = SUPPORTED_IDE_LIST.find((i) => i.id === defaultIde);

  // list item
  const li = document.createElement("li");
  li.className = "open-in-intellij-item";
  li.setAttribute("data-has-description", "false");

  // wrapper for split button
  const wrapper = document.createElement("div");
  wrapper.className = "open-in-intellij-split";

  // main button (default IDE)
  const mainBtn = createActionButton(`Open in ${ideData.name}`, () => {
    window.location.href = buildUri(defaultIde, repoUrl);
  });
  wrapper.appendChild(mainBtn);

  // overflow button (chevron)
  const overflowBtn = createActionButton("▾", () => openIdeModal(repoUrl));
  overflowBtn.classList.add("open-in-intellij-overflow");
  wrapper.appendChild(overflowBtn);

  li.appendChild(wrapper);

  // insert before Download ZIP
  const list = container.querySelector("div > ul");
  if (list && list.lastElementChild) {
    list.insertBefore(li, list.lastElementChild);
  }
}

function openIdeModal(repoUrl) {
  if (document.querySelector(".open-in-intellij-modal")) return;

  const overlay = document.createElement("div");
  overlay.className = "open-in-intellij-modal-overlay";

  const modal = document.createElement("div");
  modal.className = "open-in-intellij-modal";

  const title = document.createElement("h3");
  title.textContent = "Select the IDE to open in";
  modal.appendChild(title);

  SUPPORTED_IDE_LIST.forEach((ide) => {
    const btn = createActionButton(`Open in ${ide.name}`, () => {
      setDefaultIDE(ide.id);
      overlay.remove();
    });
    btn.addEventListener("click", () => {
      window.location.href = buildUri(ide.id, repoUrl);
    });
    modal.appendChild(btn);
  });

  const note = document.createElement("p");
  note.style.fontSize = ".8rem";
  note.style.fontStyle = "italic";
  note.style.marginTop = ".75rem";
  note.style.marginBottom = "0";
  note.textContent = "If this repository was already cloned in a JetBrains IDE, that IDE will be chosen automatically.";
  modal.appendChild(note);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

function handleNode(node) {
  if (node.nodeType !== 1 || node.tagName !== "DIV") return;

  const container = node.querySelector(".react-overview-code-button-action-list");
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

if (/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(window.location.href)) {
  console.info("GitHub JetBrains IDE Extension active.");
  observeCloneDropdown();
}
