# Eixo Design Website

This repository contains the marketing site for [eixo.design](https://eixo.design), a UX design studio that "brings clarity to complexity" and aligns systems, people, and purpose through intentional design.

## Tech Stack
- **React 19** and **ReactDOM 19** for UI components
- **Vite** for development and build tooling
- **CSS with custom fonts and variables** for styling
- **GitHub Pages** deployment via the `gh-pages` package

## Project Structure
- `src/` – React source files (`App.jsx` holds all bilingual content and interactive logic)
- `public/` – static assets copied directly into the build
- `docs/` – static copy used for GitHub Pages hosting

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm installed

### Installation
```bash
npm install
```

### Run a Development Server
```bash
npm run dev
```
The site will be available at [http://localhost:5173](http://localhost:5173).

### Build for Production
```bash
npm run build
```
Outputs files into the `dist/` directory.

### Deploy to GitHub Pages
```bash
npm run deploy
```
Builds the site and publishes the `dist/` folder to the `gh-pages` branch.

## Contact
For questions or collaboration opportunities, reach the studio at **hello@eixo.design**.
