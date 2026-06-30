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
    enabledHosts,
  };
}

function countEnabledIdes() {
  return settings.enabledIdeIds.length;
}

async function saveSettings() {
  await setStorage(settings);
}

function setMessage(message, type = '') {
  const element = document.getElementById('settings-message');
  element.textContent = message;
  element.className = `settings-message ${type}`.trim();
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
    setMessage('At least one IDE must remain enabled.', 'error');
    return;
  }

  settings.enabledIdeIds = enabled
    ? settings.enabledIdeIds.filter((enabledId) => enabledId !== id)
    : [...settings.enabledIdeIds, id];

  await saveSettings();
  renderIdeSettings();
  setMessage('IDE settings saved.', 'success');
}

function renderIdeSettings() {
  const ideList = document.getElementById('ide-list');
  const customIdeList = document.getElementById('custom-ide-list');
  ideList.textContent = '';
  customIdeList.textContent = '';

  BUILT_IN_IDES.forEach((ide) => {
    ideList.appendChild(
      createRow(ide.name, 'Built-in JetBrains launcher', [
        createSwitch(settings.enabledIdeIds.includes(ide.id), (input) =>
          toggleIde(ide.id, input)
        ),
      ])
    );
  });

  settings.customIdes.forEach((ide) => {
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'danger-button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', async () => {
      if (settings.enabledIdeIds.includes(ide.id) && countEnabledIdes() === 1) {
        setMessage('At least one IDE must remain enabled.', 'error');
        return;
      }

      settings.customIdes = settings.customIdes.filter(
        (customIde) => customIde.id !== ide.id
      );
      settings.enabledIdeIds = settings.enabledIdeIds.filter(
        (enabledId) => enabledId !== ide.id
      );
      await saveSettings();
      renderIdeSettings();
      setMessage('Custom IDE removed.', 'success');
    });

    customIdeList.appendChild(
      createRow(ide.name, ide.uriTemplate, [
        createSwitch(settings.enabledIdeIds.includes(ide.id), (input) =>
          toggleIde(ide.id, input)
        ),
        removeButton,
      ])
    );
  });
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

function renderHostSettings() {
  const hostList = document.getElementById('host-list');
  hostList.textContent = '';

  hostList.appendChild(
    createRow('github.com', 'Default public GitHub host', [
      createSwitch(settings.enabledHosts.includes('github.com'), async () => {
        settings.enabledHosts = settings.enabledHosts.includes('github.com')
          ? settings.enabledHosts.filter((host) => host !== 'github.com')
          : ['github.com', ...settings.enabledHosts];
        await saveSettings();
        renderHostSettings();
        setMessage('Host settings saved.', 'success');
      }),
    ])
  );

  settings.enabledHosts
    .filter((host) => host !== 'github.com')
    .forEach((host) => {
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'danger-button';
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', async () => {
        settings.enabledHosts = settings.enabledHosts.filter(
          (enabledHost) => enabledHost !== host
        );
        await saveSettings();
        renderHostSettings();
        setMessage('Host removed.', 'success');
      });

      hostList.appendChild(
        createRow(host, 'GitHub Enterprise Cloud host', [removeButton])
      );
    });
}

async function addCustomIde(event) {
  event.preventDefault();

  const nameInput = document.getElementById('custom-ide-name');
  const uriInput = document.getElementById('custom-ide-uri');
  const iconInput = document.getElementById('custom-ide-icon');
  const name = nameInput.value.trim();
  const uriTemplate = uriInput.value.trim();
  const icon = iconInput.value.trim();

  if (!name) {
    setMessage('Custom IDE needs a display name.', 'error');
    return;
  }

  if (!uriTemplate.includes('%r')) {
    setMessage(
      'Custom IDE URI must include the %r repository placeholder.',
      'error'
    );
    return;
  }

  if (icon && !isSafeSvg(icon)) {
    setMessage('Icon SVG contains unsupported or unsafe markup.', 'error');
    return;
  }

  const id = `custom-${Date.now()}`;
  settings.customIdes = [
    ...settings.customIdes,
    { id, name, uriTemplate, icon },
  ];
  settings.enabledIdeIds = [...settings.enabledIdeIds, id];
  await saveSettings();

  nameInput.value = '';
  uriInput.value = '';
  iconInput.value = '';
  renderIdeSettings();
  setMessage('Custom IDE added.', 'success');
}

async function addCustomHost(event) {
  event.preventDefault();

  const input = document.getElementById('custom-host');
  const host = parseHost(input.value);

  if (!host) {
    setMessage('Enter a valid host name.', 'error');
    return;
  }

  if (!host.endsWith('.ghe.com')) {
    setMessage('Only *.ghe.com enterprise hosts are supported.', 'error');
    return;
  }

  if (settings.enabledHosts.includes(host)) {
    setMessage('That host is already configured.', 'error');
    return;
  }

  settings.enabledHosts = [...settings.enabledHosts, host];
  await saveSettings();
  input.value = '';
  renderHostSettings();
  setMessage('Host added.', 'success');
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
    .addEventListener('submit', addCustomIde);
  document
    .getElementById('custom-host-form')
    .addEventListener('submit', addCustomHost);

  displayVersion();
  displayDescription();
  linkHomepage();
});
