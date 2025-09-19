# Nature Coast Solutions Website

A modern, responsive e-commerce website for Nature Coast Solutions, featuring research products and a comprehensive ordering system.

## 🌟 Features

- **Multi-page Website**: Home, How It Works, Contact, and Shop pages
- **Age Verification**: Modal to verify user age (21+) before accessing the site
- **Product Catalog**: 59+ products organized by categories (Singles, Kits, Supplies)
- **Interactive Shopping Cart**: Real-time updates with quantity selectors
- **Responsive Design**: Mobile-first approach with dedicated mobile menu
- **Docker Ready**: Containerized deployment with nginx optimization
- **Performance Optimized**: Gzip compression, caching headers, and minified assets

## 📸 Screenshot

![Nature Coast Solutions Homepage](./naturecoast-homepage.png)

## 📁 Project Structure

```text
naturecoast-website/
├── index.html              # Homepage with hero section
├── how-it-works.html       # Service explanation and process
├── contact.html            # Contact form and information
├── shop.html               # Product catalog and ordering
├── css/
│   ├── main.css           # Core styles and components
│   ├── responsive.css     # Mobile/tablet breakpoints
│   ├── how-it-works.css   # How it works page styles
│   ├── contact.css        # Contact page styles
│   └── shop.css           # Shop and cart styles
├── js/
│   ├── main.js            # Core functionality, navigation
│   └── shop.js            # Shopping cart logic
├── assets/                # Images and media files
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Docker orchestration
└── nginx.conf            # Web server configuration
```

## 🚀 Quick Start

### Local Development

```bash
# Navigate to website directory
cd naturecoast-website

# Start Python HTTP server
python3 -m http.server 8000

# Visit http://localhost:8000
```

### Docker Deployment

```bash
# Build and start container
docker-compose up -d

# Visit http://localhost:8080

# Stop container
docker-compose down
```

### Production Build

```bash
# Build Docker image
docker build -t naturecoast-website .

# Run container
docker run -d -p 80:80 naturecoast-website
```

## 💻 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with CSS Variables for theming
- **Fonts**: Google Fonts (Montserrat, Open Sans)
- **Container**: Docker with Alpine Linux
- **Web Server**: Nginx with performance optimization
- **Version Control**: Git

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛍️ Product Categories

### Singles

Individual vials for specific research needs

### Kits

- Full kits (10 vials)
- Half kits (5 vials)
- Bundled products with member discounts

### Supplies

- Bacteriostatic water
- Needles and syringes
- Shipping options

## 💳 Payment Integration

Currently supports manual payment processing via:

- Zelle
- Chime
- CashApp
- Venmo

## 🔒 Security Features

- Age verification (21+ requirement)
- Secure headers configuration
- XSS protection
- Click-jacking prevention
- Research-only product disclaimers

## 📈 Performance

- **Page Load**: < 2 seconds
- **Lighthouse Score**: 90+
- **Mobile Ready**: 100% responsive
- **SEO Optimized**: Meta tags and structured content

## 🛠️ Customization

### Updating Products

Edit the products array in `js/shop.js`:

```javascript
let products = [
    { id: 1, name: 'Product Name', price: 25.00, category: 'supplies' },
    // Add more products...
];
```

### Changing Colors

Modify CSS variables in `css/main.css`:

```css
:root {
    --primary-color: #1a1a1a;
    --secondary-color: #0066cc;
    --accent-color: #00a86b;
}
```

### Adding Pages

1. Create new HTML file
2. Include standard header/footer
3. Add corresponding CSS file
4. Update navigation in all pages

## 📝 Important Notes

- All products are for research purposes only
- Not for human, animal, or therapeutic use
- Age verification required (21+)
- Continental US shipping only

## 🤝 Support

For questions or support:

- Email: `support@naturecoastsolutions.com`
- Business Hours: 5pm - 9pm M-F CST
- Location: Dallas, TX

## 📄 License

© 2025 Nature Coast Solutions - All Rights Reserved

---

**Disclaimer**: This website and all products are intended for laboratory, scientific, and research purposes only. Products are not approved by the FDA for human or veterinary use.