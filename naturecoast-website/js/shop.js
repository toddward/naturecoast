// Shop functionality
let cart = [];
let products = [
    // Kits
    { id: 1, name: 'BAC WATER 10 VIALS / KIT', price: 25.00, category: 'supplies' },
    { id: 2, name: 'CARTLX 20MG 10 VIALS ***LIMITED TIME***', price: 245.00, category: 'kits' },
    { id: 3, name: 'CARTLX 20 MG 1/2 KIT 5 VIALS ***LIMITED TIME***', price: 123.00, category: 'kits' },
    { id: 4, name: 'SEMA 20MG *** 10 VIALS***', price: 220.00, category: 'kits' },
    { id: 5, name: 'SEMA 30MG *10 VIALS', price: 300.00, category: 'kits' },
    { id: 6, name: 'TIRZ-30MG *10 VIALS', price: 260.00, category: 'kits' },
    { id: 7, name: 'TIRZ-60MG *10 VIALS', price: 360.00, category: 'kits' },
    { id: 8, name: 'RETA 10MG *10 VIALS', price: 260.00, category: 'kits' },
    { id: 9, name: 'RETA-20MG *10 VIALS', price: 330.00, category: 'kits' },
    { id: 10, name: 'RETA 30MG *10 VIALS', price: 410.00, category: 'kits' },
    { id: 11, name: 'RETA 40MG *10 VIALS', price: 490.00, category: 'kits' },
    { id: 12, name: 'RETA 50MG ** 10 vials***', price: 550.00, category: 'kits' },
    { id: 13, name: 'CAGRILINTIDE 5MG *10 VIALS', price: 225.00, category: 'kits' },
    { id: 14, name: 'Survodutide 10mg 10 VIALS', price: 350.00, category: 'kits' },
    { id: 15, name: 'AOD9604 5mg *10 VIALS', price: 250.00, category: 'kits' },
    { id: 16, name: 'MT1 10MG *10 VIALS', price: 170.00, category: 'kits' },
    { id: 17, name: 'MT2 10MG *10 VIALS', price: 195.00, category: 'kits' },
    { id: 18, name: 'PT-141 10MG *10 VIALS', price: 212.00, category: 'kits' },
    { id: 19, name: 'B12 10mg **10 VIALS', price: 60.00, category: 'kits' },
    { id: 20, name: 'MOTS-C 10MG *10 VIALS', price: 190.00, category: 'kits' },
    { id: 21, name: 'LIPO-C W/B12 10MG *10 VIALS', price: 220.00, category: 'kits' },
    { id: 22, name: 'GLOW 70MG * 10 VIALS', price: 310.00, category: 'kits' },
    { id: 23, name: 'KLOW 80MG *10 VIALS', price: 325.00, category: 'kits' },
    { id: 24, name: 'SNAP-8 10MG *10 VIALS', price: 150.00, category: 'kits' },
    { id: 25, name: 'Glutathione 1500MG *10 VIALS', price: 205.00, category: 'kits' },
    { id: 26, name: 'SERMORELIN 10MG*10 VIALS', price: 280.00, category: 'kits' },
    { id: 27, name: 'Tesamorelin 10mg *10 VIALS', price: 290.00, category: 'kits' },
    { id: 28, name: 'Ipamorelin 10MG *10 VIALS', price: 220.00, category: 'kits' },
    { id: 29, name: 'CJC-1295 W/O DAC 5mg + IPA 5mg *10 VIALS', price: 265.00, category: 'kits' },
    { id: 30, name: 'CJC-1295 W/O DAC 5MG *10 VIALS', price: 220.00, category: 'kits' },
    { id: 31, name: 'BPC-157 10MG *10 VIALS', price: 225.00, category: 'kits' },
    { id: 32, name: 'TB 500 10 MG *10 VIALS', price: 280.00, category: 'kits' },
    { id: 33, name: 'Bpc 10mg TB 10mg 20mg Wolverine Stack *10 VIALS', price: 350.00, category: 'kits' },
    { id: 34, name: 'KissPeptin-10MG *10 VIALS', price: 210.00, category: 'kits' },
    { id: 35, name: 'KPV 10MG *10 VIALS', price: 180.00, category: 'kits' },
    { id: 36, name: 'SS-31 10MG *10 VIALS', price: 220.00, category: 'kits' },
    { id: 37, name: 'NAD+ 500MG **10 VIALS***', price: 190.00, category: 'kits' },
    { id: 38, name: 'SELANK 10MG *10 VIALS', price: 220.00, category: 'kits' },
    { id: 39, name: 'SEMAX 10MG *10 VIALS', price: 210.00, category: 'kits' },
    { id: 40, name: '5AMINO 50mg 10 VIALS', price: 275.00, category: 'kits' },
    { id: 41, name: 'GHK-CU 50MG *10 VIALS', price: 150.00, category: 'kits' },

    // Singles
    { id: 42, name: 'BAC WATER SINGLE VIAL', price: 5.00, category: 'singles' },
    { id: 43, name: 'SEMA 20 mg SINGLE VIAL', price: 35.00, category: 'singles' },
    { id: 44, name: 'TIRZ 30MG SINGLE VIAL', price: 40.00, category: 'singles' },
    { id: 45, name: 'TIRZ 60MG SINGLE VIAL', price: 70.00, category: 'singles' },
    { id: 46, name: 'RETA 10mg SINGLE VIAL', price: 50.00, category: 'singles' },
    { id: 47, name: 'CAGRI 5MG SINGLE VIAL', price: 70.00, category: 'singles' },
    { id: 48, name: 'Survodutide SINGLE VIAL', price: 85.00, category: 'singles' },
    { id: 49, name: 'AOD 5mg ***SINGLE VIAL', price: 45.00, category: 'singles' },
    { id: 50, name: 'PT-141 SINGLE VIAL', price: 28.00, category: 'singles' },
    { id: 51, name: 'Tesa 10 mg SINGLE VIALS', price: 45.00, category: 'singles' },
    { id: 52, name: 'GHK-CU 1gram powder', price: 22.00, category: 'singles' },
    { id: 53, name: 'SNAP-8 SINGLE VIAL', price: 25.00, category: 'singles' },
    { id: 54, name: 'MT-2 10mg SINGLE VIAL', price: 45.00, category: 'singles' },
    { id: 55, name: 'MT-1 SINGLE VIAL', price: 35.00, category: 'singles' },

    // Supplies
    { id: 56, name: '31G 5/16 1ML PK OF 10 NEEDLES', price: 8.00, category: 'supplies' },
    { id: 57, name: 'GA WATER 10ML ***AOD WATER*** 3X YOU CAN ONLY USE THIS IN AOD', price: 20.00, category: 'supplies' },
    { id: 58, name: 'SHIPPING 1-5 KITS', price: 10.00, category: 'supplies' },
    { id: 59, name: 'SHIPPING 6-12 KITS', price: 10.00, category: 'supplies' }
];

// Initialize shop on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productsGrid')) {
        displayProducts('all');
        loadCart();
    }
});

// Display products based on category
function displayProducts(category) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const filteredProducts = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        grid.appendChild(productElement);
    });
}

// Create product element
function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
        <div class="product-controls">
            <div class="quantity-selector">
                <button onclick="decreaseQuantity(${product.id})">-</button>
                <div class="quantity-display" id="qty-${product.id}">0</div>
                <button onclick="increaseQuantity(${product.id})">+</button>
            </div>
            <div class="item-subtotal" id="subtotal-${product.id}">$0.00</div>
        </div>
    `;
    return div;
}

// Filter products by category
function filterProducts(category) {
    displayProducts(category);

    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Increase quantity
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity < 10) {
            cartItem.quantity++;
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateDisplay(productId);
    updateCart();
}

// Decrease quantity
function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateDisplay(productId);
        updateCart();
    }
}

// Update display
function updateDisplay(productId) {
    const cartItem = cart.find(item => item.id === productId);
    const quantity = cartItem ? cartItem.quantity : 0;
    const product = products.find(p => p.id === productId);

    const qtyElement = document.getElementById(`qty-${productId}`);
    const subtotalElement = document.getElementById(`subtotal-${productId}`);

    if (qtyElement) qtyElement.textContent = quantity;
    if (subtotalElement) {
        const subtotal = quantity * product.price;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartCountSpan = document.querySelector('.cart-count');

    if (!cartItemsDiv) return;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        if (cartTotalSpan) cartTotalSpan.textContent = '$0.00';
        if (cartCountSpan) cartCountSpan.textContent = '0';
        return;
    }

    let cartHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        itemCount += item.quantity;
        cartHTML += `
            <div class="cart-item">
                <div>
                    <div>${item.name}</div>
                    <small>${item.quantity} x $${item.price.toFixed(2)}</small>
                </div>
                <div>$${subtotal.toFixed(2)}</div>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = cartHTML;
    if (cartTotalSpan) cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    if (cartCountSpan) cartCountSpan.textContent = itemCount;

    // Save cart to localStorage
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('natureCoastCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('natureCoastCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        cart.forEach(item => {
            updateDisplay(item.id);
        });
        updateCart();
    }
}

// Handle order submission
function submitOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add products to your order.');
        return;
    }

    // Collect form data
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);

    // Validate customer information
    if (!formData.get('firstName') || !formData.get('lastName') || !formData.get('email') ||
        !formData.get('address') || !formData.get('city') || !formData.get('state') || !formData.get('zip')) {
        alert('Please fill in all customer information fields.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Show order confirmation modal
    displayOrderConfirmationModal(formData);
}

// Display order confirmation modal
function displayOrderConfirmationModal(formData) {
    const modal = document.getElementById('orderConfirmationModal');

    // Populate customer info
    const customerInfo = `
        <p><strong>Name:</strong> ${formData.get('firstName')} ${formData.get('lastName')}</p>
        <p><strong>Email:</strong> ${formData.get('email')}</p>
        <p><strong>Address:</strong> ${formData.get('address')}</p>
        <p><strong>City, State, Zip:</strong> ${formData.get('city')}, ${formData.get('state')} ${formData.get('zip')}</p>
    `;
    document.getElementById('modalCustomerInfo').innerHTML = customerInfo;

    // Populate order items
    let itemsHTML = '<ul class="modal-items-list">';
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        itemsHTML += `
            <li>
                <div class="modal-item-name">${item.name}</div>
                <div class="modal-item-details">Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${subtotal.toFixed(2)}</div>
            </li>
        `;
    });
    itemsHTML += '</ul>';
    document.getElementById('modalOrderItems').innerHTML = itemsHTML;

    // Populate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('modalOrderTotal').innerHTML = `<strong>$${total.toFixed(2)}</strong>`;

    // Show modal
    modal.style.display = 'block';
}

// Close order confirmation modal
function closeOrderModal() {
    const modal = document.getElementById('orderConfirmationModal');
    modal.style.display = 'none';
}

// Confirm and submit order
function confirmAndSubmitOrder() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);

    const orderData = {
        customer: Object.fromEntries(formData),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Here you would normally send the order to a backend
    console.log('Order submitted:', orderData);

    // Close modal
    closeOrderModal();

    // Show success message
    alert('Order submitted successfully! Please complete payment using one of the provided methods.');

    // Clear cart from localStorage and memory
    cart = [];
    localStorage.removeItem('natureCoastCart');
    updateCart();
    products.forEach(p => updateDisplay(p.id));

    // Reset form
    form.reset();
}