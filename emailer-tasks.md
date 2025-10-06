# DigitalOcean App Platform + Resend Email Implementation

## Overview
Implement serverless email functionality for order submissions using DigitalOcean App Platform and Resend email service. Orders will be sent to naturecoastsolutions@gmail.com when customers click "Submit Order".

## Files to Create

### 1. `/naturecoast-website/api/send-order-email.js`
New serverless function to handle email sending
- Accepts POST requests with order data
- Formats HTML email with customer info and order details
- Uses Resend API to send email
- Returns success/error response

### 2. `/naturecoast-website/.do/app.yaml`
DigitalOcean App Platform configuration
- Defines static site configuration
- Configures serverless functions
- Sets environment variables
- Defines routes and build settings

### 3. `/naturecoast-website/.env.example`
Template for required environment variables
- Documents RESEND_API_KEY requirement
- Instructions for setup
- Not committed with actual values

## Files to Modify

### 1. `/naturecoast-website/package.json`
- Add `"resend": "^3.0.0"` to dependencies
- Ensure valid package.json structure

### 2. `/naturecoast-website/js/shop.js`
- Update `submitOrder()` function (lines 239-275)
- Change from console.log to API call
- Add async/await for fetch request to `/api/send-order-email`
- Add loading state for submit button
- Add proper error handling
- Keep existing validation logic

### 3. `/naturecoast-website/.gitignore`
- Add `.env` to prevent committing secrets
- Add `node_modules/` if not already present

## Implementation Steps

### Phase 1: Setup Resend Account
1. Sign up at resend.com (free tier: 3,000 emails/month)
2. Option A: Verify custom domain (naturecoastsolutions.com)
3. Option B: Use test domain (onboarding.resend.dev) for development
4. Generate API key from dashboard
5. Save API key securely (will add to DigitalOcean later)

### Phase 2: Create Serverless Function
1. Create `/api` directory in naturecoast-website
2. Create `send-order-email.js` with:
   - Resend SDK initialization
   - Email template formatting
   - Order details HTML generation
   - Error handling
   - Proper response formatting

**Example Function Code:**
```javascript
// api/send-order-email.js
const { Resend } = require('resend');

async function main(args) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { customer, items, total } = args;

  // Format email HTML
  const emailHtml = `
    <h2>New Order Received</h2>
    <h3>Customer Information</h3>
    <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}</p>

    <h3>Order Details</h3>
    ${items.map(item => `
      <p>${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
    `).join('')}

    <h3>Total: $${total.toFixed(2)}</h3>
  `;

  try {
    await resend.emails.send({
      from: 'orders@naturecoastsolutions.com', // Or use resend's test domain
      to: 'naturecoastsolutions@gmail.com',
      subject: `New Order from ${customer.firstName} ${customer.lastName} - $${total.toFixed(2)}`,
      html: emailHtml
    });

    return {
      statusCode: 200,
      body: { success: true, message: 'Order email sent' }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { success: false, error: error.message }
    };
  }
}

exports.main = main;
```

### Phase 3: Update Frontend
1. Modify `submitOrder()` in shop.js:
   - Add loading state UI
   - Replace console.log with fetch to `/api/send-order-email`
   - Handle success/failure responses
   - Maintain existing cart clearing logic

**Updated submitOrder() function:**
```javascript
async function submitOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add products to your order.');
    return;
  }

  const form = document.getElementById('orderForm');
  const formData = new FormData(form);
  const orderData = {
    customer: Object.fromEntries(formData),
    items: cart,
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };

  // Validate customer information
  if (!formData.get('firstName') || !formData.get('lastName') || !formData.get('email') ||
      !formData.get('address') || !formData.get('city') || !formData.get('state') || !formData.get('zip')) {
    alert('Please fill in all customer information fields.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector('.btn-submit');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting Order...';
  submitBtn.disabled = true;

  try {
    // Send to DigitalOcean function
    const response = await fetch('/api/send-order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      alert('Order submitted successfully! Please complete payment using one of the provided methods. You will receive a confirmation email shortly.');

      // Clear cart
      cart = [];
      updateCart();
      products.forEach(p => updateDisplay(p.id));
      form.reset();
    } else {
      throw new Error(result.error || 'Failed to submit order');
    }
  } catch (error) {
    console.error('Order submission error:', error);
    alert('There was an error submitting your order. Please try again or contact us directly at naturecoastsolutions@gmail.com');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}
```

### Phase 4: DigitalOcean Configuration
1. Create App Platform app spec (`.do/app.yaml`)
2. Configure static site component
3. Configure functions component
4. Define environment variables structure
5. Set routing rules

**Example app.yaml:**
```yaml
name: naturecoast-website
region: nyc
static_sites:
  - name: frontend
    source_dir: /naturecoast-website
    output_dir: /naturecoast-website
    routes:
      - path: /
functions:
  - name: send-order-email
    source_dir: /naturecoast-website/api
    envs:
      - key: RESEND_API_KEY
        scope: RUN_TIME
        type: SECRET
```

### Phase 5: Deployment
1. Commit changes to GitHub repository
2. Create App Platform app via DigitalOcean console or CLI
3. Connect GitHub repository
4. Add RESEND_API_KEY environment variable in dashboard
5. Configure auto-deploy on push
6. Initial deployment

**Deployment Steps:**
1. Go to DigitalOcean → Apps → Create App
2. Connect your GitHub repo
3. Select branch (e.g., `main`)
4. Configure:
   - **Static Site**: Root directory = `/naturecoast-website`
   - **Functions**: Directory = `/naturecoast-website/api`
5. Add environment variable: `RESEND_API_KEY` = `your_key_here`
6. Deploy

### Phase 6: Testing
1. Test in development with local server
2. Test on DigitalOcean staging environment
3. Verify emails arrive at naturecoastsolutions@gmail.com
4. Test error scenarios (network failure, invalid data)
5. Test form validation still works
6. Test cart clearing after successful submission

## Environment Variables Required

### DigitalOcean App Platform
- `RESEND_API_KEY` (secret) - API key from Resend dashboard

## Email Template Details

### Email Content Will Include:
- Subject: "New Order from [Customer Name] - $[Total]"
- Customer Information: Name, Email, Full Address
- Order Items: Product name, quantity, price per item
- Subtotals per item
- Grand Total
- Clean HTML formatting

### Sent To:
- naturecoastsolutions@gmail.com

### Sent From:
- orders@naturecoastsolutions.com (if domain verified)
- OR onboarding@resend.dev (test domain)

## Cost Breakdown

### Resend
- Free tier: 3,000 emails/month
- $20/month for 50,000 emails (if needed)

### DigitalOcean App Platform
- Static site: $5/month
- Functions: $1.85 per 100K invocations
- First 90,000 invocations free/month
- Estimated: ~$5-7/month total

## Dependencies

### package.json additions:
```json
{
  "name": "naturecoast-website",
  "version": "1.0.0",
  "dependencies": {
    "resend": "^3.0.0"
  }
}
```

## Rollback Plan
If issues occur:
1. Function failures → Check DigitalOcean logs
2. Resend errors → Verify API key and domain
3. Complete failure → Temporarily use FormSubmit fallback
4. Git revert available for all changes

## Future Enhancements (Optional)
- Send confirmation email to customer
- Add order number generation
- Store orders in database
- Add email templates with branding
- Add SMS notifications
- Add retry logic for failed emails
- Add email delivery tracking

## Success Criteria
- ✅ Orders submitted via form trigger email
- ✅ Email arrives at naturecoastsolutions@gmail.com
- ✅ All order details properly formatted
- ✅ Customer sees success message
- ✅ Cart clears after successful submission
- ✅ No API keys exposed in frontend code
- ✅ Proper error messages for failures

## Security Checklist
- [ ] API key stored as environment variable only
- [ ] No credentials in Git repository
- [ ] .env added to .gitignore
- [ ] HTTPS enabled on DigitalOcean
- [ ] Input validation on frontend and backend
- [ ] Rate limiting considered for function (future)

## Resources
- Resend Documentation: https://resend.com/docs
- DigitalOcean App Platform Docs: https://docs.digitalocean.com/products/app-platform/
- DigitalOcean Functions Docs: https://docs.digitalocean.com/products/functions/
