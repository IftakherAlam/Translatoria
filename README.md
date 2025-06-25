
# **📖 Dictionary & Translator Chrome Extension**  

A lightweight Chrome extension that provides **instant definitions, translations, and pronunciation** for any word you highlight or type. Perfect for language learners, readers, and writers!


---

## **✨ Features**  
- **Instant Definitions** – Look up English words using the [Free Dictionary API](https://dictionaryapi.dev/).  
- **Multi-language Translation** – Supports 100+ languages via LibreTranslate/Argos Translate.  
- **Text-to-Speech** – Hear word pronunciations with Chrome’s built-in speech synthesis.  
- **Word Saving** – Bookmark words to review later (stored in `chrome.storage.local`).  
- **Offline Caching** – Caches recent searches for faster lookups.  
- **Error Resilient** – Fallback APIs ensure reliability.  

---

## **🛠️ Setup & Installation**  

### **Option 1: Install from Chrome Web Store**  
1. Download from the [Chrome Web Store](https://chrome.google.com/webstore/detail/your-extension-id).  
2. Click "Add to Chrome."  

### **Option 2: Manual Installation (Developer Mode)**  
1. Clone this repo:  
   ```bash
   git clone https://github.com/yourusername/dictionary-translator-extension.git
   ```  
2. Open Chrome and go to:  
   ```
   chrome://extensions
   ```  
3. Enable **Developer mode** (toggle in top-right).  
4. Click **"Load unpacked"** and select the extension folder.  

---

## **📂 Project Structure**  
```
dictionary-translator-extension/
├── manifest.json          # Extension metadata
├── popup/                # Popup UI
│   ├── popup.html        # Popup markup
│   ├── popup.css         # Styles
│   └── popup.js          # Dictionary/translation logic
├── background.js         # Background service worker
├── content.js            # Content scripts (optional)
└── icons/                # Extension icons
```

---

## **🔌 APIs Used**  
| Service | Use Case | Free? |
|---------|----------|-------|
| [Free Dictionary API](https://dictionaryapi.dev/) | Definitions | ✅ Yes |
| [LibreTranslate](https://libretranslate.de/) | Translations | ✅ Yes |
| [MyMemory](https://mymemory.translated.net/) | Fallback Translations | ✅ Yes |
| Chrome `speechSynthesis` | Text-to-Speech | ✅ Built-in |

---

## **🚀 How to Use**  
1. **Click the extension icon** in Chrome’s toolbar.  
2. **Type a word** in the search box.  
   - Definition appears instantly.  
   - Translation defaults to Spanish (change in options).  
3. **Highlight text** on any webpage → right-click → **"Look up [word]"**.  
4. Click the **🔊 button** to hear pronunciation.  
5. **Save words** for later review.  

![Demo GIF](demo.gif) *(Add a screenshot or GIF here!)*  

---

## **🧑‍💻 Development**  
### **Dependencies**  
- Chrome Extensions API (Manifest V3)  
- No external libraries (vanilla JavaScript)  

### **Build & Test**  
1. Make changes to `popup.js` or `background.js`.  
2. Reload the extension in `chrome://extensions`.  
3. Test by searching words or using the context menu.  

### **Publish to Chrome Web Store**  
1. Zip the project:  
   ```bash
   zip -r dictionary-translator.zip *
   ```  
2. Upload to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/).  

---

## **🤝 Contributing**  
PRs welcome! To contribute:  
1. Fork the repo.  
2. Create a branch (`git checkout -b feature/your-feature`).  
3. Commit changes (`git commit -m "Add feature"`).  
4. Push to the branch (`git push origin feature/your-feature`).  
5. Open a PR.  

---



### **Credits**  
- Icons: [Flaticon](https://flaticon.com)  
- APIs: LibreTranslate, Free Dictionary API  

---
