![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/cmbpfcapjacpbmehmemljdilabjnlfhb?style=for-the-badge&logo=googlechrome&logoColor=white)
# Auto Scroll

A lightweight Chrome extension that provides convenient scroll-to-top and scroll-to-bottom functionality with hover-to-scroll features.

## Features

### 🚀 Quick Navigation
- **One-click scrolling** to top or bottom of any webpage
- **Floating buttons** that appear automatically when needed
- **Context menu integration** for quick access

### 🖱️ Hover-to-Scroll
- **Auto-scroll on hover** - hover over buttons to automatically scroll
- **Adjustable speed** - customize scroll speed from 2px to 100px per frame
- **Smart interruption** - stops automatically when you manually interact

### 🎨 Customizable Interface
- **Multiple positions** - choose between bottom-right or right-center placement
- **Auto-hide logic** - buttons hide when at top/bottom of page
- **Clean design** - minimalist buttons that blend with any website

### 🌐 International Support
- **Multi-language UI** - English and Chinese interfaces
- **Automatic detection** - uses browser language settings

## Installation

### Chrome Web Store
Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/auto-scroll/cmbpfcapjacpbmehmemljdilabjnlfhb)

### Manual Installation
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

### Basic Navigation
- Click the **↑ button** to scroll to the top of the page
- Click the **↓ button** to scroll to the bottom of the page
- Buttons automatically appear when the page is scrollable

### Auto-Scroll Feature
- **Hover over either button** to start automatic scrolling
- **Move mouse away** to stop scrolling immediately
- **Adjust speed** in extension popup for faster/slower scrolling

### Context Menu
- **Right-click anywhere** on a webpage
- Select "Scroll to Top" or "Scroll to Bottom" from context menu

## Configuration

Click the extension icon to access settings:

### Button Position
- **Bottom Right** - Traditional position at bottom-right corner
- **Right Center** - Centered vertically on the right side

### Scroll Speed
- **Slow**: 2-10px - Precise control for reading
- **Medium**: 20-40px - Comfortable default speed
- **Fast**: 50-100px - Quick navigation through long pages

### Enable/Disable
- Toggle "Show Scroll Control" to enable/disable buttons globally

## Technical Details

### Architecture
- **Manifest V3** - Modern Chrome extension format
- **Content Script** - Injects buttons and handles page interactions
- **Background Script** - Manages extension lifecycle and context menus
- **Popup UI** - Configuration interface for user preferences

### Technologies
- **JavaScript** with jQuery for DOM manipulation
- **CSS** for styling and animations
- **Chrome Extension APIs** for browser integration
- **Internationalization** with Chrome's i18n system

### Permissions
- `contextMenus` - For right-click menu integration
- `storage` - For saving user preferences
- Content script access to all websites

## Development

### File Structure
```
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── content.js            # Content script for page injection
├── popup.html/css/js     # Popup configuration UI
├── jQuery.js            # jQuery library
├── _locales/            # Internationalization files
│   ├── en/messages.json # English translations
│   └── zh_CN/messages.json # Chinese translations
└── images/              # Extension icons
```

### Building
This extension doesn't require building - just load the unpacked extension in Chrome.

### Testing
1. Load the extension in Chrome
2. Visit any scrollable webpage
3. Test button functionality and auto-scroll features
4. Verify configuration changes work correctly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Make changes and test thoroughly
4. Submit a pull request with clear description

## Support

If you encounter any issues or have feature requests:
1. Check the [Issues page](https://github.com/garethng/AutoScroll/issues)
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

## License

This project is open source and available under the [Mozilla Public License Version 2.0](LICENSE).

## Changelog

### Recent Updates
- Fixed button positioning to prevent overlap
- Enhanced auto-scroll with race condition prevention
- Added comprehensive internationalization support
- Improved scroll speed customization range
- Fixed configuration update handling

---

**Enjoy effortless scrolling!** 🚀