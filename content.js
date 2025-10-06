// noinspection JSIgnoredPromiseFromCall

let buttonCounter = 0;

const SUPPORTED_IDE_LIST = [
  {
    id: "idea",
    name: "IntelliJ IDEA",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0zm3.723 3.111h5v1.834h-1.39v6.277h1.39v1.834h-5v-1.834h1.444V4.945H3.723zm11.055 0H17v6.5c0 .612-.055 1.111-.222 1.556-.167.444-.39.777-.723 1.11-.277.279-.666.557-1.11.668a3.9 3.9 0 0 1-1.445.278c-.778 0-1.444-.167-1.944-.445a4.8 4.8 0 0 1-1.279-1.056l1.39-1.555a3.2 3.2 0 0 0 .833.722c.277.167.611.278.945.278.389 0 .721-.111 1-.389.221-.278.333-.667.333-1.278zM2.222 19.5h9V21h-9z\"/></svg>"
  },
  {
    id: "pycharm",
    name: "PyCharm",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M7.833 6.666v-.055c0-1-.667-1.5-1.778-1.5H4.389v3.055h1.723c1.111 0 1.721-.666 1.721-1.5M0 0v24h24V0zm2.223 3.167h4c2.389 0 3.833 1.389 3.833 3.445v.055c0 2.278-1.778 3.5-4.001 3.5H4.389v2.945H2.223zM11.277 21h-9v-1.5h9zm4.779-7.777c-2.944.055-5.111-2.223-5.111-5.057C10.944 5.333 13.056 3 16.111 3c1.889 0 3 .611 3.944 1.556l-1.389 1.61c-.778-.722-1.556-1.111-2.556-1.111-1.658 0-2.873 1.375-2.887 3.084.014 1.709 1.174 3.083 2.887 3.083 1.111 0 1.833-.445 2.61-1.167l1.39 1.389c-.999 1.112-2.166 1.779-4.054 1.779\"/></svg>"
  },
  {
    id: "webstorm",
    name: "WebStorm",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0zm17.889 2.889c1.444 0 2.667.444 3.667 1.278l-1.111 1.667c-.889-.611-1.722-1-2.556-1s-1.278.389-1.278.889v.056c0 .667.444.889 2.111 1.333 2 .556 3.111 1.278 3.111 3v.056c0 2-1.5 3.111-3.611 3.111-1.5-.056-3-.611-4.167-1.667l1.278-1.556c.889.722 1.833 1.222 2.944 1.222.889 0 1.389-.333 1.389-.944v-.056c0-.556-.333-.833-2-1.278-2-.5-3.222-1.056-3.222-3.056v-.056c0-1.833 1.444-3 3.444-3zm-16.111.222h2.278l1.5 5.778 1.722-5.778h1.667l1.667 5.778 1.5-5.778h2.333l-2.833 9.944H9.723L8.112 7.277l-1.667 5.778H4.612zm.5 16.389h9V21h-9z\"/></svg>"
  },
  {
    id: "phpstorm",
    name: "PhpStorm",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M7.833 6.611v-.055c0-1-.667-1.5-1.778-1.5H4.389v3.056h1.722c1.111-.001 1.722-.668 1.722-1.501M0 0v24h24V0zm2.167 3.111h4.056c2.389 0 3.833 1.389 3.833 3.445v.055c0 2.333-1.778 3.5-4.056 3.5H4.333v3H2.167zM11.278 21h-9v-1.5h9zM18.5 10.222c0 2-1.5 3.111-3.667 3.111-1.5-.056-3-.611-4.222-1.667l1.278-1.556c.89.722 1.833 1.222 3 1.222.889 0 1.444-.333 1.444-.944v-.056c0-.555-.333-.833-2-1.277C12.333 8.555 11 8 11 6v-.056c0-1.833 1.444-3 3.5-3 1.444 0 2.723.444 3.723 1.278l-1.167 1.667c-.889-.611-1.777-1-2.611-1-.833 0-1.278.389-1.278.889v.056c0 .667.445.889 2.167 1.333 2 .556 3.167 1.278 3.167 3z\"/></svg>"
  },
  {
    id: "rubymine",
    name: "RubyMine",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0Zm3.056 3H6.92q.945 0 1.665.347t1.106.977c.262.42.392.902.392 1.46q0 .835-.399 1.478a2.6 2.6 0 0 1-1.125.99 2 2 0 0 1-.297.103l-.13.04L10.276 12H8.264l-1.94-3.4H4.811V12H3.056Zm8.51 0h2.444l1.851 5.907.154.773.136-.773L17.937 3h2.482v9h-1.736V5.578l.026-.47L16.613 12H15.34l-2.07-6.846.026.424V12h-1.73ZM4.812 4.459V7.14h1.993q.444-.001.771-.161.335-.167.515-.47c.12-.205.18-.439.18-.713q0-.411-.18-.707a1.17 1.17 0 0 0-.515-.462 1.7 1.7 0 0 0-.77-.168ZM2.996 19.2h9.6V21h-9.6z\"/></svg>"
  },
  {
    id: "clion",
    name: "CLion",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0zm7.041 3a5 5 0 0 1 .219 0c1.86 0 3 .6 3.9 1.56L9.78 6.18C9 5.46 8.22 5.04 7.26 5.04c-1.68 0-2.88 1.38-2.88 3.12 0 1.68 1.2 3.12 2.88 3.12 1.14 0 1.86-.48 2.64-1.14l1.38 1.38c-1.02 1.08-2.16 1.8-4.08 1.8a5.1 5.1 0 0 1-5.1-5.16A5.05 5.05 0 0 1 7.04 3zm5.738.12H15v8.1h4.32v1.86h-6.54V3.12zM2.28 19.5h9V21h-9z\"/></svg>"
  },
  {
    id: "goland",
    name: "GoLand",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0Zm6.764 3a5.45 5.45 0 0 1 3.892 1.356L9.284 6.012A3.65 3.65 0 0 0 6.696 5c-1.6 0-2.844 1.4-2.844 3.08v.028c0 1.812 1.244 3.14 3 3.14a3.47 3.47 0 0 0 2.048-.596V9.228H6.708v-1.88H11v4.296a6.43 6.43 0 0 1-4.228 1.572c-3.076 0-5.196-2.164-5.196-5.092v-.028A5.08 5.08 0 0 1 6.764 3m10.432 0c3.052 0 5.244 2.276 5.244 5.088v.028a5.116 5.116 0 0 1-5.272 5.12c-3.056-.02-5.248-2.296-5.248-5.112v-.028A5.116 5.116 0 0 1 17.196 3m-.028 2A2.96 2.96 0 0 0 14.2 8.068v.028a3.01 3.01 0 0 0 3 3.112 2.96 2.96 0 0 0 2.964-3.084v-.028A3.004 3.004 0 0 0 17.168 5M2.252 19.5h9V21h-9z\"/></svg>"
  },
  {
    id: "rider",
    name: "Rider",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0zm7.031 3.113A4.06 4.06 0 0 1 9.72 4.14a3.23 3.23 0 0 1 .84 2.28A3.16 3.16 0 0 1 8.4 9.54l2.46 3.6H8.28L6.12 9.9H4.38v3.24H2.16V3.12c1.61-.004 3.281.009 4.871-.007m5.509.007h3.96c3.18 0 5.34 2.16 5.34 5.04 0 2.82-2.16 5.04-5.34 5.04h-3.96zm4.069 1.976c-.607.01-1.235.004-1.849.004v6.06h1.74a2.88 2.88 0 0 0 3.06-3 2.897 2.897 0 0 0-2.951-3.064M4.319 5.1v2.88H6.6c1.08 0 1.68-.6 1.68-1.44 0-.96-.66-1.44-1.74-1.44zM2.16 19.5h9V21h-9Z\"/></svg>"
  },
  {
    id: "datagrip",
    name: "DataGrip",
    icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003h-1.69v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037a2.85 2.85 0 0 0-2.793-2.999M2.208 19.495h9v1.5h-9z\"/></svg>"
  },
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

function createActionButton(label, onClick, extraClass = "", icon = null) {
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

  if (icon && isSafeSvg(icon)) {
    const iconWrapper = document.createElement("span");
    iconWrapper.className = "open-with-jetbrains-ide-icon";
    iconWrapper.innerHTML = icon;
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

function isSafeSvg(svgString) {
  return !/<\s*(script|iframe|object|embed|link|style|on\w+)/i.test(svgString);
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

function openIdeModal(repoUrl) {
  if (document.querySelector(".open-with-jetbrains-ide-modal")) return;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);

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
      ide.icon
    );
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