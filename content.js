let ideaIdCounter = 0;

function addIntelliJButton(container, repoUrl) {
  if (!container || container.querySelector(".open-in-intellij")) return;

  const id = `idea-${ideaIdCounter++}`;
  const labelId = `${id}--label`;

  const li = document.createElement("li");
  li.className = "open-in-intellij-item";
  li.setAttribute("data-has-description", "false");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = id;
  btn.tabIndex = 0;
  btn.setAttribute("aria-labelledby", labelId);
  btn.setAttribute("data-size", "medium");
  btn.className = "open-in-intellij-btn";

  const spacer = document.createElement("span");
  spacer.className = "open-in-intellij-spacer";
  btn.appendChild(spacer);

  const labelWrapper = document.createElement("span");
  labelWrapper.className = "open-in-intellij-subcontent";
  labelWrapper.setAttribute("data-component", "ActionList.Item--DividerContainer");

  const label = document.createElement("span");
  label.className = "open-in-intellij-label";
  label.id = labelId;
  label.textContent = "Open in IntelliJ IDEA";

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

  // Check if the clone container is present
  const container = node.querySelector(".react-overview-code-button-action-list");
  if (!container) return;

  // Check if the repo link is present
  const linkInput = container.querySelector("input#clone-with-https");
  if (!linkInput) {
    console.warn("Clone link input not found. This likely indicates a change in GitHub's DOM structure and should be reported.", container);
    return;
  }

  // Check if the repo link is not empty
  const repo_link = linkInput.value.trim();
  if (!repo_link) {
    console.warn("Clone link input is empty. Cannot generate buttons.", container);
    return;
  }

  addIntelliJButton(container, repo_link);
}

function observeCloneDropdown() {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(handleNode);
    }
  });

  observer.observe(document.body, {childList: true, subtree: true});
}

// Only run on GitHub repo pages
if (/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(window.location.href)) {
  console.info("The extension 'github-open-in-intellij-ide' is active on this page.");
  observeCloneDropdown();
}
