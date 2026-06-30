const BUILT_IN_IDES = [
  { id: 'studio', name: 'Android Studio' },
  { id: 'clion', name: 'CLion' },
  { id: 'dataspell', name: 'DataSpell' },
  { id: 'goland', name: 'GoLand' },
  { id: 'idea', name: 'IntelliJ IDEA' },
  { id: 'phpstorm', name: 'PhpStorm' },
  { id: 'pycharm', name: 'PyCharm' },
  { id: 'rider', name: 'Rider' },
  { id: 'rubymine', name: 'RubyMine' },
  { id: 'rustrover', name: 'RustRover' },
  { id: 'webstorm', name: 'WebStorm' },
];

const SETTINGS_DEFAULTS = {
  enabledIdeIds: BUILT_IN_IDES.map((ide) => ide.id),
  customIdes: [],
  enabledHosts: ['github.com'],
};

let settings = { ...SETTINGS_DEFAULTS };
let selectedIconSvg = '';

function isSafeSvg(svgString) {
  return !/<\s*(script|iframe|object|embed|link|style|on\w+)/i.test(svgString);
}

function getStorage(values) {
  return new Promise((resolve) => chrome.storage.sync.get(values, resolve));
}

function setStorage(values) {
  return new Promise((resolve) => chrome.storage.sync.set(values, resolve));
}

function normalizeSettings(raw) {
  const builtInIds = new Set(BUILT_IN_IDES.map((ide) => ide.id));
  const customIdes = Array.isArray(raw.customIdes) ? raw.customIdes : [];
  const customIds = new Set(customIdes.map((ide) => ide.id));
  const enabledIdeIds = Array.isArray(raw.enabledIdeIds)
    ? raw.enabledIdeIds.filter((id) => builtInIds.has(id) || customIds.has(id))
    : SETTINGS_DEFAULTS.enabledIdeIds;
  const enabledHosts = Array.isArray(raw.enabledHosts)
    ? raw.enabledHosts
    : SETTINGS_DEFAULTS.enabledHosts;

  return {
    enabledIdeIds: enabledIdeIds.length ? enabledIdeIds : [BUILT_IN_IDES[0].id],
    customIdes,
    enabledHosts: enabledHosts.length ? enabledHosts : ['github.com'],
  };
}

function getAllIdes() {
  return [
    ...BUILT_IN_IDES.map((ide) => ({ ...ide, type: 'built-in' })),
    ...settings.customIdes.map((ide) => ({ ...ide, type: 'custom' })),
  ];
}

function countEnabledIdes() {
  return settings.enabledIdeIds.length;
}

function countEnabledHosts() {
  return settings.enabledHosts.length;
}

async function saveSettings() {
  await setStorage(settings);
}

function showInputError(input, message) {
  input.setCustomValidity(message);
  input.reportValidity();
}

function clearInputError(input) {
  input.setCustomValidity('');
}

function createSwitch(checked, onChange) {
  const label = document.createElement('label');
  label.className = 'switch';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input));

  const slider = document.createElement('span');
  slider.className = 'slider';

  label.append(input, slider);
  return label;
}

function createButton(label, className, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function createRow(title, subtitle, actions) {
  const row = document.createElement('div');
  row.className = 'settings-row';

  const main = document.createElement('div');
  main.className = 'settings-row-main';

  const titleElement = document.createElement('span');
  titleElement.className = 'settings-row-title';
  titleElement.textContent = title;
  main.appendChild(titleElement);

  if (subtitle) {
    const subtitleElement = document.createElement('span');
    subtitleElement.className = 'settings-row-subtitle';
    subtitleElement.textContent = subtitle;
    main.appendChild(subtitleElement);
  }

  const actionWrapper = document.createElement('div');
  actionWrapper.className = 'settings-actions';
  actions.forEach((action) => actionWrapper.appendChild(action));

  row.append(main, actionWrapper);
  return row;
}

async function toggleIde(id, input) {
  const enabled = settings.enabledIdeIds.includes(id);

  if (enabled && countEnabledIdes() === 1) {
    input.checked = true;
    return;
  }

  settings.enabledIdeIds = enabled
    ? settings.enabledIdeIds.filter((enabledId) => enabledId !== id)
    : [...settings.enabledIdeIds, id];

  await saveSettings();
  renderIdeSettings();
}

function renderIdeSettings() {
  const ideList = document.getElementById('ide-list');
  ideList.textContent = '';

  getAllIdes().forEach((ide) => {
    const actions = [];

    if (ide.type === 'built-in') {
      actions.push(
        createSwitch(settings.enabledIdeIds.includes(ide.id), (input) =>
          toggleIde(ide.id, input)
        )
      );
    }

    if (ide.type === 'custom') {
      actions.push(
        createButton('Edit', 'secondary-button', () => startCustomIdeEdit(ide)),
        createButton('Remove', 'danger-button', () => removeCustomIde(ide.id))
      );
    }

    ideList.appendChild(
      createRow(ide.name, ide.type === 'custom' ? ide.uriTemplate : '', actions)
    );
  });
}

function resetCustomIdeForm() {
  document.getElementById('custom-ide-id').value = '';
  document.getElementById('custom-ide-name').value = '';
  document.getElementById('custom-ide-uri').value = '';
  document.getElementById('custom-ide-icon').value = '';
  document.getElementById('custom-ide-icon-label').textContent =
    'Choose SVG file';
  document.getElementById('custom-ide-submit').textContent = 'Add custom IDE';
  document.getElementById('custom-ide-cancel').hidden = true;
  selectedIconSvg = '';
}

function startCustomIdeEdit(ide) {
  document.getElementById('custom-ide-id').value = ide.id;
  document.getElementById('custom-ide-name').value = ide.name;
  document.getElementById('custom-ide-uri').value = ide.uriTemplate;
  document.getElementById('custom-ide-icon').value = '';
  document.getElementById('custom-ide-icon-label').textContent = ide.icon
    ? 'Current SVG kept unless replaced'
    : 'Choose SVG file';
  document.getElementById('custom-ide-submit').textContent = 'Save custom IDE';
  document.getElementById('custom-ide-cancel').hidden = false;
  selectedIconSvg = ide.icon || '';
}

async function removeCustomIde(id) {
  if (settings.enabledIdeIds.includes(id) && countEnabledIdes() === 1) {
    return;
  }

  settings.customIdes = settings.customIdes.filter((ide) => ide.id !== id);
  settings.enabledIdeIds = settings.enabledIdeIds.filter(
    (enabledId) => enabledId !== id
  );
  await saveSettings();
  resetCustomIdeForm();
  renderIdeSettings();
}

function parseHost(value) {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return '';

  try {
    return new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`)
      .hostname;
  } catch {
    return '';
  }
}

async function toggleHost(host, input) {
  const enabled = settings.enabledHosts.includes(host);

  if (enabled && countEnabledHosts() === 1) {
    input.checked = true;
    return;
  }

  settings.enabledHosts = enabled
    ? settings.enabledHosts.filter((enabledHost) => enabledHost !== host)
    : [...settings.enabledHosts, host];
  await saveSettings();
  renderHostSettings();
}

function renderHostSettings() {
  const hostList = document.getElementById('host-list');
  hostList.textContent = '';

  settings.enabledHosts
    .filter((host) => host !== 'github.com')
    .sort()
    .forEach((host) => {
      hostList.appendChild(createHostRow(host, true));
    });

  hostList.prepend(
    createHostRow('github.com', settings.enabledHosts.includes('github.com'))
  );
}

function createHostRow(host, enabled) {
  const actions = [];

  if (host === 'github.com') {
    actions.push(createSwitch(enabled, (input) => toggleHost(host, input)));
  }

  if (host !== 'github.com') {
    actions.push(
      createButton('Remove', 'danger-button', async () => {
        if (settings.enabledHosts.includes(host) && countEnabledHosts() === 1) {
          return;
        }

        settings.enabledHosts = settings.enabledHosts.filter(
          (enabledHost) => enabledHost !== host
        );
        await saveSettings();
        renderHostSettings();
      })
    );
  }

  return createRow(
    host,
    host === 'github.com' ? '' : 'GitHub Enterprise Cloud host',
    actions
  );
}

function readSvgFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error));
    reader.readAsText(file);
  });
}

async function handleIconUpload(event) {
  const input = event.target;
  const file = input.files[0];
  if (!file) return;

  const label = document.getElementById('custom-ide-icon-label');
  const svg = await readSvgFile(file);

  if (!file.name.toLowerCase().endsWith('.svg') || !isSafeSvg(svg)) {
    input.value = '';
    selectedIconSvg = '';
    showInputError(input, 'Choose a safe SVG file.');
    return;
  }

  clearInputError(input);
  selectedIconSvg = svg;
  label.textContent = file.name;
}

async function saveCustomIde(event) {
  event.preventDefault();

  const idInput = document.getElementById('custom-ide-id');
  const nameInput = document.getElementById('custom-ide-name');
  const uriInput = document.getElementById('custom-ide-uri');
  const name = nameInput.value.trim();
  const uriTemplate = uriInput.value.trim();

  if (!name) {
    showInputError(nameInput, 'Custom IDE needs a display name.');
    return;
  }

  if (!uriTemplate.includes('%r')) {
    showInputError(
      uriInput,
      'Custom IDE URI must include the %r repository placeholder.'
    );
    return;
  }

  const id = idInput.value || `custom-${Date.now()}`;
  const customIde = { id, name, uriTemplate, icon: selectedIconSvg };

  if (idInput.value) {
    settings.customIdes = settings.customIdes.map((ide) =>
      ide.id === id ? customIde : ide
    );
  } else {
    settings.customIdes = [...settings.customIdes, customIde];
    settings.enabledIdeIds = [...settings.enabledIdeIds, id];
  }

  await saveSettings();
  resetCustomIdeForm();
  renderIdeSettings();
}

async function addCustomHost(event) {
  event.preventDefault();

  const input = document.getElementById('custom-host');
  const host = parseHost(input.value);

  if (!host) {
    showInputError(input, 'Enter a valid host name.');
    return;
  }

  if (!host.endsWith('.ghe.com')) {
    showInputError(input, 'Only *.ghe.com enterprise hosts are supported.');
    return;
  }

  if (settings.enabledHosts.includes(host)) {
    showInputError(input, 'That host is already configured.');
    return;
  }

  settings.enabledHosts = [...settings.enabledHosts, host];
  await saveSettings();
  input.value = '';
  renderHostSettings();
}

document.addEventListener('DOMContentLoaded', async () => {
  const tabs = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');

  function openTab(tabName) {
    tabs.forEach((btn) =>
      btn.classList.toggle('active', btn.dataset.tab === tabName)
    );
    panels.forEach((panel) =>
      panel.classList.toggle('active', panel.id === tabName)
    );
  }

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => openTab(btn.dataset.tab));
  });

  function displayVersion() {
    const version = chrome.runtime.getManifest().version;
    const versionElement = document.getElementById('version');
    const versionNumberElement = document.getElementById('version-number');

    if (version) {
      versionElement.style.display = 'block';
      versionNumberElement.textContent = version;
    }
  }

  function displayDescription() {
    const description = chrome.runtime.getManifest().description;
    const descriptionElement = document.getElementById('description');

    if (description) {
      descriptionElement.textContent = description;
    }
  }

  function linkHomepage() {
    const homepage = chrome.runtime.getManifest().homepage_url;
    const homepageElement = document.getElementById('project-homepage');
    homepageElement.href = homepage;
  }

  settings = normalizeSettings(await getStorage(SETTINGS_DEFAULTS));
  renderIdeSettings();
  renderHostSettings();
  document
    .getElementById('custom-ide-form')
    .addEventListener('submit', saveCustomIde);
  document
    .getElementById('custom-ide-cancel')
    .addEventListener('click', resetCustomIdeForm);
  document
    .getElementById('custom-ide-icon')
    .addEventListener('change', handleIconUpload);
  document
    .getElementById('custom-host-form')
    .addEventListener('submit', addCustomHost);
  document
    .querySelectorAll('.settings-form input')
    .forEach((input) =>
      input.addEventListener('input', () => clearInputError(input))
    );

  displayVersion();
  displayDescription();
  linkHomepage();
});
