# GTA PD Reference Manual

A beautiful, book-style website for GTA Police Department reference materials including 10-codes, penal codes, amendments, and SOPs.

## 🚀 How to Open

Simply open `index.html` in your web browser:
- Double-click the `index.html` file, or
- Right-click → Open with → Your preferred browser (Chrome, Firefox, Edge, etc.)

## ✨ Features

### Premium Design
- **Dark Theme**: Modern, eye-friendly dark interface with vibrant accent colors
- **Book-Style Interface**: Elegant cover page that opens into a full manual
- **Smooth Animations**: Page transitions, hover effects, and micro-interactions
- **Glassmorphism**: Modern glass-like effects and gradients

### Navigation
- **Sidebar Navigation**: Easy access to all 4 sections
- **Search Functionality**: Quickly find codes and procedures
- **Keyboard Shortcuts**:
  - `ESC` - Close the manual
  - `Ctrl/Cmd + K` - Focus search box
  - `Arrow Left/Right` - Navigate between pages

### Sections
1. **10-Codes** - Radio communication codes (grid layout)
2. **Penal Codes** - Criminal offenses and penalties (categorized list)
3. **Amendments** - Constitutional rights (detailed cards)
4. **SOP** - Standard Operating Procedures (step-by-step guides)

## 📝 Adding Your Content

The website currently has placeholder content. To add your actual data:

### 1. For 10-Codes
Edit `index.html` and find the `.codes-grid` section (around line 120). Add more code cards:

```html
<div class="code-card">
    <div class="code-number">10-XX</div>
    <div class="code-meaning">Your meaning here</div>
</div>
```

### 2. For Penal Codes
Find the `.penal-section` sections (around line 160). Add more items:

```html
<div class="penal-item">
    <div class="penal-code">PC XXX</div>
    <div class="penal-details">
        <div class="penal-name">Crime Name</div>
        <div class="penal-penalty">Penalty: Description</div>
    </div>
</div>
```

### 3. For Amendments
Find the `.amendment-list` section (around line 240). Add more cards:

```html
<div class="amendment-card">
    <div class="amendment-number">Xth Amendment</div>
    <div class="amendment-title">Title Here</div>
    <div class="amendment-text">Full text here...</div>
</div>
```

### 4. For SOPs
Find the `.sop-sections` section (around line 290). Add more procedures:

```html
<div class="sop-section">
    <h2 class="sop-title">Procedure Name</h2>
    <ol class="sop-steps">
        <li>Step 1 description</li>
        <li>Step 2 description</li>
        <li>Step 3 description</li>
    </ol>
</div>
```

## 🎨 Customization

### Colors
Edit `styles.css` to change the color scheme. Main colors are defined at the top:
- `--accent-primary`: Main accent color (currently blue)
- `--accent-secondary`: Secondary accent (currently purple)
- `--gold-accent`: Warning/note color (currently gold)

### Fonts
The site uses:
- **Inter** for body text
- **Roboto Mono** for code numbers

You can change these in the `<head>` section of `index.html`.

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

The layout automatically adjusts for optimal viewing on any screen size.

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 📄 Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - Interactive functionality
- `README.md` - This file

## 💡 Tips

1. **Search**: Use the search box to quickly find specific codes
2. **Keyboard Navigation**: Use arrow keys to move between pages
3. **Print**: You can print individual pages using your browser's print function
4. **Offline**: Works completely offline - no internet required

## 🔧 Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks)
- No external dependencies (except Google Fonts)
- Lightweight and fast
- Works offline after first load

---

**Ready to use!** Just open `index.html` and start adding your content.
