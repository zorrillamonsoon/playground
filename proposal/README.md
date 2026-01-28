# Curtis Brown Ltd - Website Redesign Proposal

A private proposal page for Curtis Brown Ltd, prepared by Edgar Zorrilla and Paul Denya.

## Structure

```
proposal/
├── index.html          # Main proposal page
├── css/
│   └── styles.css      # All styling
├── js/
│   └── main.js         # Interactive functionality
├── assets/             # Place images and documents here
│   └── (your assets)
└── README.md
```

## Configuration

### Assets

Update the `ASSETS_PATH` variable in `index.html` to point to your assets directory:

```javascript
const ASSETS_PATH = "./assets";
```

Supported asset placeholders:
- `edgar-portrait.jpg` - Edgar Zorrilla profile photo
- `paul-portrait.jpg` - Paul Denya profile photo
- Additional logos, wireframes, or screenshots as needed

### Typography

The page uses Google Fonts with easily swappable pairings:

**Current (Recommended):**
- Libre Baskerville (serif headlines)
- Source Sans 3 (sans-serif body)

**Alternative Option B - More Traditional:**
- Playfair Display + Lato

**Alternative Option C - Contemporary Editorial:**
- Cormorant Garamond + Inter

To change fonts, update the Google Fonts import in `index.html` and the `--font-serif` and `--font-sans` custom properties in `styles.css`.

## Features

- Persistent sidebar navigation with active state tracking
- Shareable section URLs (e.g., `/proposal#security`)
- Subtle scroll-triggered animations
- Mobile-responsive design
- Respects `prefers-reduced-motion` accessibility preference
- Lazy loading for images
- Semantic HTML structure
- WCAG 2.1 AA accessibility considerations

## Hosting

This is a static site with no dependencies. Host on any web server:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Any static hosting provider

For local preview:
```bash
# Python 3
python -m http.server 8000

# Node.js (using npx)
npx serve
```

Then visit `http://localhost:8000/proposal/`

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Progressive enhancement ensures basic functionality without JavaScript.
