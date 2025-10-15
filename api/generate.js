export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test response
    return res.status(200).json({
      message: 'API route working!',
      received: req.body
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}