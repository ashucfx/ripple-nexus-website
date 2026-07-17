export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    // Fetch available slots from today onwards
    const today = new Date().toISOString().split('T')[0];
    const url = `${supabaseUrl}/rest/v1/rns_slots?is_available=eq.true&slot_date=gte.${today}&order=slot_date.asc,start_time.asc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch slots from database');
    }

    const slots = await response.json();
    res.status(200).json({ success: true, slots });

  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
