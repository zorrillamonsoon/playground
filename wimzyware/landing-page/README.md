# Wimzyware Landing Page

Marketing landing page for [wimzyware.com](https://wimzyware.com) -- the safe AI workflow for shipping website and app changes with staging, approvals, and control.

## Running Locally

Open `index.html` directly in a browser, or use any static file server:

```bash
cd wimzyware/landing-page
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Tech Stack

- Plain HTML5, CSS3, JavaScript (no frameworks, no build step)
- Google Fonts (Montserrat)
- CSS custom properties for design tokens
- Intersection Observer API for scroll animations

## Deployment

Currently intended for static hosting. Future deployment target is AWS S3 + CloudFront with the wimzyware.com domain.
