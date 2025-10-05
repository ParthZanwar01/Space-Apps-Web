# ORCA Technologies Website

NASA's Orbital Recycling & Capture Apparatus (ORCA) Technologies Website showcasing advanced space debris management technologies.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the build script:**
   ```bash
   npm run build
   ```

3. **Serve locally:**
   ```bash
   npm run serve
   ```
   Then open http://localhost:8000

## 🔧 Build Process

This project uses a custom build script to properly handle NASA WDS (Web Design System) assets for deployment.

### What the Build Script Does

The `build.js` script copies all necessary NASA WDS assets from `node_modules/nasawds/src/` to the public `assets/` directory:

- **CSS:** `assets/css/nasa-styles.css`
- **JavaScript:** `assets/js/uswds.min.js`
- **Images:** `assets/images/` (logo, US flag, icons)
- **Fonts:** `assets/fonts/`

### Why This Is Necessary

NASA WDS assets were originally referenced directly from `node_modules/`, which causes issues on static hosting platforms like Netlify because:

1. `node_modules/` is typically not deployed
2. Direct `node_modules/` references are not a best practice for production
3. Assets need to be in the public directory structure

## 📁 Project Structure

```
├── assets/
│   ├── css/
│   │   ├── styles.css          # Custom styles
│   │   └── nasa-styles.css     # NASA WDS styles (copied by build script)
│   ├── js/
│   │   ├── navigation.js       # Custom JavaScript
│   │   └── uswds.min.js        # NASA WDS JavaScript (copied by build script)
│   ├── fonts/                  # NASA WDS fonts (copied by build script)
│   └── images/
│       ├── usa-icons/          # NASA WDS icons (copied by build script)
│       ├── logo-img.png        # NASA logo (copied by build script)
│       └── us_flag_small.png   # US flag (copied by build script)
├── *.html                      # HTML pages (updated to use local assets)
├── build.js                    # Build script for asset copying
└── package.json                # Project configuration
```

## 🚀 Deployment

### Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `assets/` directory and HTML files** to Netlify

3. **No additional configuration needed** - all NASA WDS assets are now properly included

### Manual Deployment

If you're not using Netlify's automatic builds, ensure you run `npm run build` before deploying.

## 🛠️ Available Scripts

- `npm run build` - Copy NASA WDS assets and prepare for deployment
- `npm run serve` - Serve the site locally for development

## 🔗 Technologies

- **NASA Web Design System (WDS)** - Official NASA design system
- **US Web Design System (USWDS)** - Underlying design system
- **Custom Components** - Interactive satellite component gallery
- **Responsive Design** - Works on desktop and mobile devices

## 📝 Pages

- **Home** (`index.html`) - Overview of ORCA technologies
- **Component Gallery** (`components.html`) - Interactive satellite components
- **Technologies** (`innovation-technologies.html`) - Detailed technology information
- **EBAM** (`ebam.html`) - Electron-Beam Additive Manufacturing details
- **EBCHM** (`ebchm.html`) - Electron-Beam Cutting & Harvesting Module details
- **Gecko Grippers** (`gecko-grippers.html`) - Gecko-inspired gripping technology

## 🎯 Problem Solved

This project previously experienced **502 Bad Gateway** and **404 Not Found** errors on Netlify due to NASA WDS assets being referenced from `node_modules/`. The build script and updated HTML references now ensure all assets are properly deployed and accessible.
