import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize SMTP transporter with environment variables
//
// TROUBLESHOOTING SSL/TLS ERRORS:
//
// For "wrong version number" error, try these configurations:
//
// Option 1: Port 587 with STARTTLS (current configuration)
// - Set SMTP_PORT=587 and SMTP_SECURE=false in .env
//
// Option 2: Port 465 with SSL/TLS
// - Set SMTP_PORT=465 and SMTP_SECURE=true in .env
//
// Option 3: Port 25 (if allowed by your provider)
// - Set SMTP_PORT=25 and SMTP_SECURE=false in .env
//
// For Gmail specifically:
// 1. Use an App Password (not your regular password)
// 2. Enable 2FA and generate an App Password at: https://myaccount.google.com/apppasswords
// 3. Use smtp.gmail.com as host
// 4. Port 587 with SMTP_SECURE=false OR Port 465 with SMTP_SECURE=true
//
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  // TLS configuration to fix SSL version errors
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false,
    // Force TLS version to prevent SSL version mismatch
    minVersion: 'TLSv1.2',
    // Enable cipher suite that works with most SMTP servers
    ciphers: 'SSLv3'
  },
  // Additional options for STARTTLS on port 587
  requireTLS: process.env.SMTP_PORT === '587' || !process.env.SMTP_PORT,
  // Connection timeout
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  // Debug output
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  const smtpConfig = {
    host: process.env.SMTP_HOST ? 'configured' : 'missing',
    port: process.env.SMTP_PORT || '587',
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER ? 'configured' : 'missing',
    pass: process.env.SMTP_PASS ? 'configured' : 'missing',
    from: process.env.SMTP_FROM || 'orders@naturecoastsolutions.com',
    to: process.env.SMTP_TO || 'orders@naturecoastsolutions.com'
  };

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    smtp: smtpConfig
  });
});

// Send order email endpoint
app.post('/send-order-email', async (req, res) => {
  console.log('Received order submission:', new Date().toISOString());

  try {
    const { customer, items, subtotal, shipping, total } = req.body;

    // Validate required data
    if (!customer || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required order data'
      });
    }

    console.log(`Processing order for ${customer.firstName} ${customer.lastName}`);

    // Format order items HTML
    const itemsHtml = items.map(item => {
      const itemSubtotal = item.price * item.quantity;
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${itemSubtotal.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    // Format shipping HTML
    let shippingHtml = '';
    if (shipping === null) {
      shippingHtml = `
        <tr>
          <td colspan="3" style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;"><strong>Shipping:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;"><em>Quote Required</em></td>
        </tr>
      `;
    } else if (shipping > 0) {
      shippingHtml = `
        <tr>
          <td colspan="3" style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;"><strong>Shipping:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${shipping.toFixed(2)}</td>
        </tr>
      `;
    }

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order from Nature Coast Solutions</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">New Order Received</h2>

        <h3 style="color: #333; margin-top: 30px;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5;"><strong>Name:</strong></td>
            <td style="padding: 8px;">${customer.firstName} ${customer.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;">${customer.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5;"><strong>Address:</strong></td>
            <td style="padding: 8px;">${customer.address}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5;"><strong>City, State, Zip:</strong></td>
            <td style="padding: 8px;">${customer.city}, ${customer.state} ${customer.zip}</td>
          </tr>
        </table>

        <h3 style="color: #333; margin-top: 30px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;"><strong>Subtotal:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;"><strong>$${subtotal.toFixed(2)}</strong></td>
            </tr>
            ${shippingHtml}
            <tr>
              <td colspan="3" style="padding: 15px 10px; text-align: right; font-size: 18px;"><strong>Total:</strong></td>
              <td style="padding: 15px 10px; text-align: right; font-size: 18px; color: #0066cc;"><strong>$${total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>

        ${shipping === null ? '<p style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;"><strong>Note:</strong> This order requires a custom shipping quote. Please contact the customer to provide shipping cost.</p>' : ''}

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated order notification from Nature Coast Solutions<br>
          Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST
        </p>
      </body>
      </html>
    `;

    // Send email via SMTP
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'orders@naturecoastsolutions.com',
      to: process.env.SMTP_TO || 'orders@naturecoastsolutions.com',
      subject: `New Order from ${customer.firstName} ${customer.lastName} - $${total.toFixed(2)}`,
      html: emailHtml
    });

    console.log('Email sent successfully:', info.messageId);

    res.json({
      success: true,
      message: 'Order email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send order email'
    });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Email endpoint: POST http://localhost:${PORT}/send-order-email`);

  // Log SMTP configuration status
  console.log('\n=== SMTP Configuration ===');
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST ? '✓ Set' : '✗ Missing'}`);
  console.log(`SMTP_PORT: ${process.env.SMTP_PORT || '587 (default)'}`);
  console.log(`SMTP_SECURE: ${process.env.SMTP_SECURE === 'true' ? 'true (SSL/TLS)' : 'false'}`);
  console.log(`SMTP_USER: ${process.env.SMTP_USER ? '✓ Set' : '✗ Missing'}`);
  console.log(`SMTP_PASS: ${process.env.SMTP_PASS ? '✓ Set' : '✗ Missing'}`);
  console.log(`SMTP_FROM: ${process.env.SMTP_FROM || 'orders@naturecoastsolutions.com (default)'}`);
  console.log(`SMTP_TO: ${process.env.SMTP_TO || 'orders@naturecoastsolutions.com (default)'}`);

  // Test SMTP connection
  try {
    await transporter.verify();
    console.log('✓ SMTP connection verified successfully');
  } catch (error) {
    console.error('✗ SMTP connection failed:', error.message);
    console.error('Please check your SMTP configuration');
  }
  console.log('========================\n');
});