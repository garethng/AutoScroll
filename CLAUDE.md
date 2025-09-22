# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension called "Auto Scroll" that provides convenient scroll-to-top and scroll-to-bottom functionality. The extension adds floating buttons to web pages and includes context menu integration.

## Architecture

- **Manifest V3**: Uses Chrome Extension Manifest V3 format
- **Content Script**: `content.js` - Injects scroll buttons and handles page interactions
- **Background Script**: `background.js` - Manages extension lifecycle and context menus
- **Popup UI**: `popup.html/css/js` - Configuration interface for users
- **Localization**: Supports English and Chinese locales
- **jQuery Dependency**: Uses jQuery for DOM manipulation

## Key Components

- **Scroll Buttons**: Floating buttons at bottom-right of pages
- **Auto-hide Logic**: Buttons hide when at top/bottom of page
- **Context Menu**: Right-click menu with scroll options
- **Storage**: Uses `chrome.storage.local` for user preferences
- **Internationalization**: Multi-language support via `_locales`

## Development Commands

Since this is a Chrome extension, there are no build commands. Development involves:

1. **Load Extension**: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked" and select this directory
2. **Testing**: Reload extension after changes and test on web pages
3. **Debugging**: Use Chrome DevTools for content script debugging

## File Structure

```
├── background.js          # Background service worker
├── content.js            # Content script for page injection
├── jQuery.js            # jQuery library
├── manifest.json        # Extension manifest
├── popup.html/css/js    # Popup UI components
├── _locales/            # Localization files
└── images/              # Extension icons
```

## Important Patterns

- Uses jQuery for DOM manipulation (`$` selector)
- Message passing between content/background scripts via `chrome.runtime.sendMessage`
- CSS styling applied programmatically in JavaScript
- Event-driven architecture with message listeners

## Extension Permissions

- `contextMenus`: For right-click menu integration
- `storage`: For saving user preferences
- Content script matches all URLs (`*://*/*`)

## Localization Keys

- `extension_name`: "Auto Scroll"
- `extension_description": "Easily scroll to the top and the bottom of current page"
- `popup_config_hide_all": "Show Scroll Control"