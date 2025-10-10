<!--suppress HtmlDeprecatedAttribute -->

<br>

<div align="center">
    <img src="assets/favicons/icon128_full.png" alt="Logo">
    <h1>GitHub to JetBrains IDE</h1>
</div>

<div align="center">
    <a href="https://github.com/TD99/github-open-in-jetbrains-ide/releases/latest"><img src="https://img.shields.io/github/v/tag/TD99/github-open-in-jetbrains-ide?style=flat&label=Version" alt="GitHub Tag"></a>
    <a href="https://github.com/TD99/github-open-in-jetbrains-ide/actions/workflows/build-and-release.yml"><img src="https://img.shields.io/github/actions/workflow/status/TD99/github-open-in-jetbrains-ide/build-and-release.yml?label=Lint%2C%20Validate%2C%20Build%20%26%20Release" alt="Lint, Validate, Build & Release"></a>
</div>

<br>

<div align="center">
    <img src="https://img.shields.io/badge/Chrome%20Extension-%23000000.svg?style=flat&logo=chromewebstore&logoColor=white" alt="Chrome Extension">
    <img src="https://img.shields.io/badge/Firefox%20Extension-%23000000.svg?style=flat&logo=firefoxbrowser&logoColor=white" alt="Firefox Extension">
    <img src="https://img.shields.io/badge/JavaScript-%23000000.svg?style=flat&logo=javascript&logoColor=white" alt="JavaScript">
    <img src="https://img.shields.io/badge/GitHub-%23000000.svg?style=flat&logo=github&logoColor=white" alt="GitHub">
    <img src="https://img.shields.io/badge/JetBrains-%23000000.svg?style=flat&logo=jetbrains&logoColor=white" alt="JetBrains">    
</div>

<br>

<div align="center">
    <a href="https://chromewebstore.google.com/detail/pppdeonmpbikkfkhoacgmbmlkfbmlpjg"><img src="https://img.shields.io/badge/Get%20on%20Chrome%20Web%20Store-%231f3a12.svg?style=for-the-badge&logo=chromewebstore&logoColor=white" alt="Get on Chrome Web Store"></a>
    <a href="https://addons.mozilla.org/en-US/firefox/addon/github-to-jetbrains-ide/"><img src="https://img.shields.io/badge/Get%20on%20Firefox%20Browser%20Add--ons-%2320123A.svg?style=for-the-badge&logo=firefoxbrowser&logoColor=white" alt="Get on Firefox Browser Add-ons"></a>
</div>

<br>

## Overview
GitHub to JetBrains IDE is a browser extension that adds an `Open with <JetBrains IDE>` button to GitHub repositories.
With a single click, you can open any GitHub project directly in your favorite JetBrains IDE.

The extension supports all major JetBrains IDEs, including Android Studio, CLion, DataSpell, GoLand, IntelliJ IDEA,
PhpStorm, PyCharm, Rider, RubyMine, RustRover, and WebStorm.

## Features
- Adds `Open with <IDE>` and dropdown options to GitHub's `Code` menu.
- Remembers your default JetBrains IDE selection.
- Opens repositories directly through the JetBrains Toolbox.
- Automatically detects cloned repositories to open them in the correct IDE.
- Integrates seamlessly with GitHub's interface.

## How It Works
When you visit a GitHub repository page, the extension injects a small script (`content.js`) that:

1. Detects the repository's clone URL.
2. Adds two buttons to the Code dropdown:
    - `Open with <IDE>` (default IDE)
    - `▼` (choose another IDE)
3. On click, the extension opens the repository using the `jetbrains://` URI scheme.
    - Example: `jetbrains://idea/checkout/git?checkout.repo=https://github.com/user/repo.git`
4. If a repository is already cloned locally, JetBrains Toolbox automatically opens it in the correct IDE.

## Permissions
The extension requests the following permissions:

| Permission             | Purpose                                                      |
|------------------------|--------------------------------------------------------------|
| `storage`              | Saves the user's default IDE preference.                     |
| `https://github.com/*` | Injects the "Open with IDE" functionality into GitHub pages. |

## Installation (Development)

1. You can either:
    - Clone this repository.
    - Download the [latest release](https://github.com/TD99/github-open-in-jetbrains-ide/releases/latest) and extract
      the contents.
2. Open `chrome://extensions/` in your browser.
3. Enable Developer mode (top-right toggle).
4. Click `Load unpacked`.
5. Select the folder containing this repository.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
