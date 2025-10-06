# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nature Coast Solutions e-commerce website - a static HTML/CSS/JavaScript site with product catalog, shopping cart, and manual payment processing. Currently implementing features for cryptocurrency payments, member authentication, and inventory management.

## Development Commands

### Local Development
```bash
# Navigate to website directory
cd naturecoast-website

# Install dependencies (http-server)
npm install

# Start development server
npx http-server -p 8000
# OR use Python's built-in server
python3 -m http.server 8000

# Access at http://localhost:8000
```

### Docker Development
```bash
# Build and start container
cd naturecoast-website
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Production Build
```bash
cd naturecoast-website
docker build -t naturecoast-website .
docker run -d -p 80:80 naturecoast-website
```

## Architecture & Key Components

### Frontend Structure
The site is a multi-page static website with vanilla JavaScript for interactivity:

- **Pages**: `index.html` (home), `shop.html` (product catalog), `how-it-works.html` (info), `contact.html` (contact form)
- **Shopping Cart**: Implemented in `js/shop.js` with localStorage persistence
- **Product Data**: Hardcoded array in `js/shop.js` (lines 3-68) - 59 products across categories (singles, kits, supplies)
- **Age Verification**: Modal implementation in `js/main.js` with cookie-based persistence
- **Responsive Design**: Mobile-first approach with dedicated mobile menu and breakpoints in `css/responsive.css`

### Current Payment Flow
Manual payment processing via Zelle/Chime/CashApp/Venmo - order details sent via form submission without backend processing.

### Planned Features (from README)
1. **Cryptocurrency Payments**: 5% discount, evaluating Coinbase Commerce, NOWPayments, BTCPay Server, or BitPay
2. **Members-Only Section**: Authentication system with admin vetting for exclusive product access
3. **Inventory Management**: Database-driven product management replacing hardcoded arrays

### Docker Configuration
- **nginx:alpine** base image for lightweight deployment
- Custom nginx.conf with gzip compression and caching headers
- Health checks configured
- Volume mounting for development in docker-compose.yml

## Working with Products

Products are currently managed in `js/shop.js`:
```javascript
// Line 3-68 contains the products array
let products = [
    { id: 1, name: 'Product Name', price: 25.00, category: 'supplies' },
    // ...
];
```

Categories: 'singles', 'kits', 'supplies'

To add/modify products, edit this array directly. Future implementation will move this to a database.

## CSS Architecture

- `css/main.css`: Core styles, CSS variables for theming
- `css/responsive.css`: Mobile/tablet breakpoints
- `css/shop.css`: Shopping cart and product grid
- `css/contact.css`: Contact form styles
- `css/how-it-works.css`: Info page specific styles

Theme customization via CSS variables in main.css:
```css
:root {
    --primary-color: #1a1a1a;
    --secondary-color: #0066cc;
    --accent-color: #00a86b;
}
```

## Current Work Branch

Working on branch: `updates/setup_for_wed`
Main branch for PRs: `main`

Modified files in current session:
- contact.html
- css/shop.css
- how-it-works.html
- index.html
- js/shop.js
- shop.html
- products.csv (untracked)

## Important Notes

- All products are for research purposes only
- Age verification (21+) required
- Continental US shipping only
- Business hours: 5pm - 9pm M-F CST