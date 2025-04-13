# EUU Dashboard

Welcome to the **EUU Dashboard** — a lightweight, modular toolkit for building and managing Europa Universalis IV mod files. Originally a side tool, it has grown into a standalone project to help streamline the creation of custom countries, tags, and file structures for modern-day EU4 mods.

---
## 🚀 Latest Release: EUU Dashboard v1.0

- Scrollable searchable file managers for `history/countries` and `common/countries`
- Auto-tag generator with real-time preview and local save
- Tag list manager with delete & download
- Modular components (header, footer, navbar) for easy maintenance

[Read full patch notes here](CHANGELOG.md)

---

## 📦 Features

- 🧾 **Generate Country Files**  
  Create new `history/countries` and `common/countries` files using clean, form-based UIs. Saved directly to localStorage for easy management.

- 🛠️ **Tag Generator**  
  Pair history and common country files to generate `country_tags.txt` entries with proper formatting. 

- 🔍 **Searchable File Managers**  
  Browse and filter your `history/countries` and `common/countries` files in real time.

- 💾 **Local Storage Persistence**  
All your generated files and tags are saved locally and editable in-session.

- 🧹 **Modular Layout**  
Includes reusable JS components: navbar, header, footer — easy to extend.

- 📥 **Export Tools**  
One-click export of your generated country tags as a ready-to-use `.txt` file.

---

## 🧰 Usage

> You can run this dashboard locally in your browser.

1. Clone this repository:
 ```bash
 git clone https://github.com/your-username/euu-dashboard.git

2. Open index.html in your browser

3. Start generating, pairing, and exporting your mod files 🚀 
  
📁 File Structure
bash
Copy
Edit
euu-dashboard/
├── index.html                   # Main dashboard UI
├── history-countries.html       # Form for history/countries file creation
├── common-countries.html        # Form for common/countries file creation
├── scripts/
│   ├── ccscript.js              # Logic for common/countries form
│   ├── hcscript.js              # Logic for history/countries form
│   ├── dashboard.js             # Tag generator and dashboard logic
│   ├── modules.js               # Shared components (navbar, header, footer)
│   ├── storage.js               # LocalStorage helpers & data management
│   ├── utils.js                 # Utility functions (formatting, etc.)
│   └── constants.js             # Centralized constants (e.g., idea groups)
├── styles/
│   └── styles.css               # Shared styles
├── icons/                       # PNGs, SVGs, logos
├── dev_artifacts/               # Temporary or dev-only data 
├── CHANGELOG.md                 # Full release notes
├── LICENSE                      # MIT License
└── README.md                    # You are here
📌 Related Repositories
🎮 EUU Mod Repository
The core EU4 mod files — tags, provinces, decisions, events, and more.

🛠️ Roadmap
 Entry editing

 Dark mode

 Batch generation tools

 File import/export

🐾 Credits
Built with love by @anjosmelanie
Designed for curious modders, nerds, and EU4 enjoyers everywhere.