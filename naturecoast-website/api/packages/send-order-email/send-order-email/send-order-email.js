// DigitalOcean Serverless Function for sending order emails via Resend
import { Resend } from 'resend';

export async function main(event) {
  // Check if this is a POST request
  if (event.http && event.http.method !== 'POST') {
    return {
      statusCode: 405,
      body: { success: false, error: 'Method not allowed' }
    };
  }

  // Initialize Resend with API key from environment
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Extract order data from event (DigitalOcean auto-parses JSON body)
  const { customer, items, subtotal, shipping, total } = event;

  // Validate required data
  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Missing required order data' }
    };
  }

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

  // Build complete email HTML
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

  try {
    // Send email via Resend
    const result = await resend.emails.send({
      from: 'orders@resend.dev', // Using Resend's default domain
      to: 'wardzinski.todd+nature@gmail.com', // Debug email address
      subject: `New Order from ${customer.firstName} ${customer.lastName} - $${total.toFixed(2)}`,
      html: emailHtml
    });

    return {
      statusCode: 200,
      body: { success: true, message: 'Order email sent successfully', id: result.id }
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: { success: false, error: error.message || 'Failed to send order email' }
    };
  }
}
