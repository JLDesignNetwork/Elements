# Changelog - JLDN Elements

All notable changes to the **JLDN Elements** UI component suite will be documented in this file.

The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and this project adheres to the [JLDN Generational Versioning Schema (GVS)](https://github.com/JLDesignNetwork/Generational-Versioning-Schema).

## [2412.2.0-s] - 2026-08-18

### Added
- **In-Repo Documentation Wiki (`docs/`)**: Initialized internal wiki hub containing `docs/index.md`, `docs/architecture.md`, and `docs/usage.md`.
- **Generational Development Hub (`.dev/`)**: Established root `.dev/` generational hub containing `ROADMAP.md`, `backlog.json`, `2412/backlog.json`, and `2412/ideas.json`.
- **GitHub Governance Suite**: Scaffolded `.github/FUNDING.yml`, `.github/SECURITY.md`, `.github/CONTRIBUTING.md`, `.github/CODE_OF_CONDUCT.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/copilot-instructions.md`, structured `.github/ISSUE_TEMPLATE/` forms, and automated CI workflows (`ci.yml`, `codeql.yml`).

### Changed
- **Package Metadata**: Standardized package naming to `@jldn/elements` with GVS version `2412.2.0-s`.
- **Workspace Cleanliness**: Purged ephemeral macOS resource fork files and hardened `.gitignore`.

## [2412.1.21-s] - 2026-06-12

### Changed
- Injected JSDoc versioning into `src/script.js` and `src/style.sass`.
- Overhauled `README.md` badges to flat-square format.

## [2412.1.20-s] - 2026-06-11

### Added
- Animation controls: Pausing and speed variation support on candy-stripe keyframes.

## [2412.1.19-s] - 2026-05-29

### Added
- **Unified Single-Link Script Loader (`core.js`)**: Single `<script src="core.js?modules=button,meter">` dynamic injection.
- **Pre-configured Shorthand CSS Classes**: Class-based shorthand naming (e.g. `.jldn-button-cyberpunk-3d`, `.jldn-meter-matrix`).
- **Programmatic JS Creation APIs**: Exposed helper methods on `window.JLDN` (`createButton`, `createMeter`, `createCode`, `createAlert`, `createPopup`).

## [2412.1.0-s] - 2024-12-02

### Added
- Initial genesis build: Modular UI component architecture with SASS theme compiler.
