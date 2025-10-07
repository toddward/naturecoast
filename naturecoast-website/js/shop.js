// Shop functionality
let cart = [];
let products = [
    // Kits
  { id: 1, name: 'BAC WATER 10 VIALS / KIT', price: 25.00, category: 'supplies' },
  { id: 2, name: 'CARTLX 20 MG 10 VIALS / KIT', price: 245.00, category: 'kits' },
  { id: 3, name: 'SEMA 10 MG 10 VIALS / KIT', price: 210.00, category: 'kits' },
  { id: 4, name: 'SEMA 20 MG 10 VIALS / KIT', price: 240.00, category: 'kits' },
  { id: 5, name: 'SEMA 30 MG 10 VIALS / KIT', price: 260.00, category: 'kits' },
  { id: 6, name: 'TIRZ 30 MG 10 VIALS / KIT', price: 260.00, category: 'kits' },
  { id: 7, name: 'TIRZ 60 MG 10 VIALS / KIT', price: 360.00, category: 'kits' },
  { id: 8, name: 'TIRZ 120 MG 10 VIALS / KIT', price: 460.00, category: 'kits' },
  { id: 9, name: 'RETA 10 MG 10 VIALS / KIT', price: 260.00, category: 'kits' },
  { id: 10, name: 'RETA 20 MG 10 VIALS / KIT', price: 330.00, category: 'kits' },
  { id: 11, name: 'RETA 30 MG 10 VIALS / KIT', price: 400.00, category: 'kits' },
  { id: 12, name: 'RETA 40 MG 10 VIALS / KIT', price: 450.00, category: 'kits' },
  { id: 13, name: 'RETA 50 MG 10 VIALS / KIT', price: 500.00, category: 'kits' },
  { id: 14, name: 'RETA 60 MG 10 VIALS / KIT', price: 550.00, category: 'kits' },
  { id: 15, name: 'EPITALON 10 MG 10 VIALS / KIT', price: 190.00, category: 'kits' },
  { id: 16, name: 'CAGRILINTIDE 5 MG 10 VIALS / KIT', price: 225.00, category: 'kits' },
  { id: 17, name: 'SURVOLIGUTIDE 10 MG 10 VIALS / KIT', price: 335.00, category: 'kits' },
  { id: 18, name: 'AOD9604 5 MG 10 VIALS / KIT', price: 250.00, category: 'kits' },
  { id: 19, name: 'MT1 10 MG 10 VIALS / KIT', price: 170.00, category: 'kits' },
  { id: 20, name: 'MT2 10 MG 10 VIALS / KIT', price: 170.00, category: 'kits' },
  { id: 21, name: 'PT-141 10 MG 10 VIALS / KIT', price: 212.00, category: 'kits' },
  { id: 22, name: 'B12 10 ML 10 VIALS / KIT', price: 60.00, category: 'kits' },
  { id: 23, name: 'MOTS-C 10 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 24, name: 'LIPO-C W/B12 10 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 25, name: 'GLOW 70 MG 10 VIALS / KIT', price: 310.00, category: 'kits' },
  { id: 26, name: 'KLOW 80 MG 10 VIALS / KIT', price: 325.00, category: 'kits' },
  { id: 27, name: 'SNAP-8 10 MG 10 VIALS / KIT', price: 175.00, category: 'kits' },
  { id: 28, name: 'GLUTATHIONE 1500 MG 10 VIALS / KIT', price: 230.00, category: 'kits' },
  { id: 29, name: 'GHKCU 50 MG 10 VIALS / KIT', price: 180.00, category: 'kits' },
  { id: 30, name: 'SERMORELIN 10 MG 10 VIALS / KIT', price: 290.00, category: 'kits' },
  { id: 31, name: 'TESAMORELIN 10 MG 10 VIALS / KIT', price: 290.00, category: 'kits' },
  { id: 32, name: 'IPAMORELIN 10 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 33, name: 'CJC-1295 W/O DAC 5 MG + IPA 5 MG 10 VIALS / KIT', price: 265.00, category: 'kits' },
  { id: 34, name: 'CJC-1295 W/O DAC 5 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 35, name: 'BPC-157 10 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 36, name: 'OXYTOCIN 5 MG 10 VIALS / KIT', price: 218.00, category: 'kits' },
  { id: 37, name: 'TB 500 10 MG 10 VIALS / KIT', price: 290.00, category: 'kits' },
  { id: 38, name: 'WOLVERINE STACK BPC 10 MG/TB 10 MG 20MG 10 VIALS / KIT', price: 350.00, category: 'kits' },
  { id: 39, name: 'KISSPEPTIN 10 MG 10 VIALS / KIT', price: 210.00, category: 'kits' },
  { id: 40, name: 'KPV 10 MG 10 VIALS / KIT', price: 180.00, category: 'kits' },
  { id: 41, name: 'SS31 10 MG 10 VIALS / KIT', price: 230.00, category: 'kits' },
  { id: 42, name: 'NAD+ 500 MG 10 VIALS / KIT', price: 190.00, category: 'kits' },
  { id: 43, name: 'SELANK 10 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 44, name: 'SEMAX 10 MG 10 VIALS / KIT', price: 220.00, category: 'kits' },
  { id: 45, name: '5 AMINO 1MQ 50 MG 10 VIALS / KIT', price: 275.00, category: 'kits' },
  { id: 46, name: 'LCARNITINE 600 MG 10 VIALS / KIT', price: 190.00, category: 'kits' },
  { id: 47, name: 'THYMOSIN ALPHA 1 5 MG 10 VIALS / KIT', price: 255.00, category: 'kits' },
  { id: 48, name: 'THYMOSIN ALPHA 1 10 MG 10 VIALS / KIT', price: 320.00, category: 'kits' },
  { id: 49, name: 'VIP 10 MG 10 VIALS / KIT', price: 320.00, category: 'kits' },
  { id: 50, name: 'SLU PP332 5 MG 10 VIALS / KIT', price: 250.00, category: 'kits' },
  { id: 51, name: 'LL37 5 MG 10 VIALS / KIT', price: 250.00, category: 'kits' },
  { id: 52, name: 'FOX04 10 MG 10 VIALS / KIT', price: 530.00, category: 'kits' },
  { id: 53, name: 'VIT C 10 VIALS / KIT', price: 100.00, category: 'kits' },
  //singles
  { id: 54, name: 'BAC WATER SINGLE VIAL', price: 5.00, category: 'singles' },
  { id: 55, name: 'SEMA 20 MG SINGLE VIAL', price: 35.00, category: 'singles' },
  { id: 56, name: 'TIRZ 30 MG SINGLE VIAL', price: 40.00, category: 'singles' },
  { id: 57, name: 'TIRZ 60 MG SINGLE VIAL', price: 60.00, category: 'singles' },
  { id: 58, name: 'RETA 10 MG SINGLE VIAL', price: 30.00, category: 'singles' },
  { id: 59, name: 'CAGRILINTIDE 5MG SINGLE VIAL', price: 55.00, category: 'singles' },
  { id: 60, name: 'SURVOLIGUTIDE 10 MG SINGLE VIAL', price: 70.00, category: 'singles' },
  { id: 61, name: 'AOD 5 MG SINGLE VIAL', price: 35.00, category: 'singles' },
  { id: 62, name: 'PT-141 SINGLE VIAL', price: 25.00, category: 'singles' },
  { id: 63, name: 'TESAMORELIN 10 MG SINGLE VIAL', price: 45.00, category: 'singles' },
  { id: 64, name: 'GHK-CU COSMETIC POWDER 1 GRAM', price: 25.00, category: 'singles' },
  { id: 65, name: 'SNAP-8 SINGLE VIAL', price: 25.00, category: 'singles' },
  { id: 66, name: 'MT-2 10 MG SINGLE VIAL', price: 25.00, category: 'singles' },
  { id: 67, name: 'MT-1 10 MG SINGLE VIAL', price: 25.00, category: 'singles' },
  //supplies
  { id: 68, name: '31G 5/16 1ML PK OF 10 NEEDLES', price: 8.00, category: 'supplies' },
  { id: 69, name: 'GA WATER 10 ML AOD WATER ONLY', price: 20.00, category: 'supplies' }
];

// Count total kits in cart
function countKitsInCart() {
    return cart.reduce((count, item) => {
        const product = products.find(p => p.id === item.id);
        if (product && product.category === 'kits') {
            count += item.quantity;
        }
        return count;
    }, 0);
}

// Calculate shipping based on kit count
function calculateShipping() {
    const kitCount = countKitsInCart();

    if (kitCount === 0) {
        return 0;
    } else if (kitCount >= 1 && kitCount <= 5) {
        return 10.00;
    } else if (kitCount >= 6 && kitCount <= 12) {
        return 20.00;
    } else {
        // 13+ kits - quote required
        return null;
    }
}

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
function filterProducts(category, event) {
    displayProducts(category);

    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Increase quantity
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
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
    let subtotal = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        itemCount += item.quantity;
        cartHTML += `
            <div class="cart-item">
                <div>
                    <div>${item.name}</div>
                    <small>${item.quantity} x $${item.price.toFixed(2)}</small>
                </div>
                <div>$${itemSubtotal.toFixed(2)}</div>
            </div>
        `;
    });

    // Calculate shipping
    const shipping = calculateShipping();
    const kitCount = countKitsInCart();

    // Add shipping to cart display
    if (kitCount > 0) {
        if (shipping === null) {
            cartHTML += `
                <div class="cart-item shipping-item">
                    <div>
                        <div>Shipping (${kitCount} kits)</div>
                        <small>Quote required for 13+ kits</small>
                    </div>
                    <div>Contact Us</div>
                </div>
            `;
        } else {
            cartHTML += `
                <div class="cart-item shipping-item">
                    <div>
                        <div>Shipping (${kitCount} kits)</div>
                        <small>Auto-calculated</small>
                    </div>
                    <div>$${shipping.toFixed(2)}</div>
                </div>
            `;
        }
    }

    cartItemsDiv.innerHTML = cartHTML;

    // Calculate total
    const total = shipping !== null ? subtotal + shipping : subtotal;
    if (cartTotalSpan) {
        if (shipping === null) {
            cartTotalSpan.textContent = `$${subtotal.toFixed(2)} + Quote`;
        } else {
            cartTotalSpan.textContent = `$${total.toFixed(2)}`;
        }
    }
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
    let subtotal = 0;
    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        itemsHTML += `
            <li>
                <div class="modal-item-name">${item.name}</div>
                <div class="modal-item-details">Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${itemSubtotal.toFixed(2)}</div>
            </li>
        `;
    });

    // Add shipping to order items
    const shipping = calculateShipping();
    const kitCount = countKitsInCart();

    if (kitCount > 0) {
        if (shipping === null) {
            itemsHTML += `
                <li class="shipping-item">
                    <div class="modal-item-name">Shipping (${kitCount} kits)</div>
                    <div class="modal-item-details">We'll reach out to you for a custom shipping quote</div>
                </li>
            `;
        } else {
            itemsHTML += `
                <li class="shipping-item">
                    <div class="modal-item-name">Shipping (${kitCount} kits)</div>
                    <div class="modal-item-details">$${shipping.toFixed(2)}</div>
                </li>
            `;
        }
    }

    itemsHTML += '</ul>';
    document.getElementById('modalOrderItems').innerHTML = itemsHTML;

    // Populate total
    const total = shipping !== null ? subtotal + shipping : subtotal;
    if (shipping === null) {
        document.getElementById('modalOrderTotal').innerHTML = `<strong>$${subtotal.toFixed(2)}</strong><br><small style="font-weight: normal;">Shipping quote will be provided separately</small>`;
    } else {
        document.getElementById('modalOrderTotal').innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
    }

    // Show modal
    modal.style.display = 'block';
}

// Close order confirmation modal
function closeOrderModal() {
    const modal = document.getElementById('orderConfirmationModal');
    modal.style.display = 'none';
}

// Confirm and submit order
async function confirmAndSubmitOrder() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = calculateShipping();
    const total = shipping !== null ? subtotal + shipping : subtotal;

    const orderData = {
        customer: Object.fromEntries(formData),
        items: cart,
        subtotal: subtotal,
        shipping: shipping,
        total: total
    };

    // Get confirm button for loading state
    const confirmBtn = document.querySelector('#orderConfirmationModal .btn-primary');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Submitting Order...';
    confirmBtn.disabled = true;

    try {
        // Send order to serverless function
        const response = await fetch('/send-order-email/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Close modal
            closeOrderModal();

            // Show success message
            alert('Order submitted successfully! Please complete payment using one of the provided methods. You will receive a confirmation email shortly.');

            // Clear cart from localStorage and memory
            cart = [];
            localStorage.removeItem('natureCoastCart');
            updateCart();
            products.forEach(p => updateDisplay(p.id));

            // Reset form
            form.reset();
        } else {
            throw new Error(result.error || 'Failed to submit order');
        }
    } catch (error) {
        console.error('Order submission error:', JSON.stringify(error));
        alert('There was an error submitting your order. Please try again or contact us directly at naturecoastsolutions@gmail.com');
    } finally {
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
    }
}
