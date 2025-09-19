function addIntelliJButton(container) {
  if (!container) return;

  // Prevent duplicates
  if (container.querySelector(".open-in-intellij")) return;

  // HTTPS clone URL input
  const input = container.querySelector('input[type="text"]#clone-with-https');
  if (!input) return;
  const repoUrl = input.value;

  // Build list item
  const li = document.createElement("li");
  li.className = "prc-ActionList-ActionListItem-uq6I7";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "prc-ActionList-ActionListContent-sg9-x open-in-intellij";
  btn.style.cursor = "pointer";

  // GitHub-style label wrapper
  const labelWrapper = document.createElement("span");
  labelWrapper.className = "prc-ActionList-ActionListSubContent-lP9xj";
  labelWrapper.setAttribute(
    "data-component",
    "ActionList.Item--DividerContainer",
  );

  const label = document.createElement("span");
  label.className = "prc-ActionList-ItemLabel-TmBhn";
  label.innerText = "Open in IntelliJ IDEA";

  labelWrapper.appendChild(label);
  btn.appendChild(labelWrapper);
  li.appendChild(btn);

  // Action: open IntelliJ
  btn.addEventListener("click", () => {
    const uri =
      "jetbrains://idea/checkout/git?checkout.repo=" +
      encodeURIComponent(repoUrl);
    window.location.href = uri;
  });

  // Insert before "Download ZIP"
  const list = container.querySelector("ul.prc-ActionList-ActionList-X4RiC");
  if (list) list.insertBefore(li, list.lastElementChild);
}

function handleNode(node) {
  if (node.nodeType !== 1 || node.tagName !== "DIV") return;

  // Check if the overlay is present
  const overlay = node.querySelector(":scope > .prc-Overlay-Overlay-dVyJl");
  if (!overlay) return;

  // Check if the clone container is present
  const container = overlay.querySelector(".react-overview-code-button-action-list");
  if (!container) return;

  console.debug("Found clone container: ", container);
  addIntelliJButton(container);
}

function observeCloneDropdown() {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(handleNode);
    }
  });

  observer.observe(document.body, {childList: true, subtree: true});
}

// Only run on GitHub repo pages (rough check: must contain "github.com/<user>/<repo>")
if (/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(window.location.href)) {
  observeCloneDropdown();
}
