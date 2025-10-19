// api/verify-license.js

export default async function handler(req, res) {
  // CORS headers (Vercel handles most of this automatically, but keeping for compatibility)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      valid: false,
      error: 'Method not allowed' 
    });
  }

  const { licenseKey } = req.body;

  // Validate license key
  if (!licenseKey || licenseKey.trim().length === 0) {
    return res.status(400).json({ 
      valid: false,
      error: 'License key is required' 
    });
  }

  // Get product ID from environment variable
  const productId = process.env.GUMROAD_PRODUCT_ID;
  
  if (!productId) {
    console.error('GUMROAD_PRODUCT_ID environment variable not set');
    return res.status(500).json({ 
      valid: false,
      error: 'Server configuration error. Please contact support.' 
    });
  }

  try {
    // Call Gumroad API
    const formData = new URLSearchParams();
    formData.append('product_id', productId);
    formData.append('license_key', licenseKey);
    formData.append('increment_uses_count', 'false'); // Don't count verification as a use

    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const data = await response.json();

    // Log for debugging (remove in production if desired)
    console.log('Gumroad verification response:', {
      success: data.success,
      hasEmail: !!data.purchase?.email
    });

    // Check if verification was successful
    if (data.success && data.purchase) {
      return res.status(200).json({ 
        valid: true,
        purchaseInfo: {
          email: data.purchase.email,
          saleTimestamp: data.purchase.sale_timestamp,
        }
      });
    } else {
      // License key is invalid or already used
      return res.status(200).json({ 
        valid: false,
        error: 'Invalid license key. Please check your email from Gumroad.'
      });
    }

  } catch (error) {
    console.error('License verification error:', error);
    return res.status(500).json({ 
      valid: false,
      error: 'Verification service unavailable. Please try again.'
    });
  }
}