import { Request, Response } from 'express';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = 'ChIJjTIYIgC5qjsRcL6Q-fCDunM'; // Thanjavur branch

    if (!apiKey) {
      console.warn('GOOGLE_MAPS_API_KEY not found in env, falling back to mock data.');
      return res.json({ success: true, data: [] });
    }

    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,reviews`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      const errTxt = await response.text();
      console.error('Google Places API error:', errTxt);
      return res.status(500).json({ success: false, error: { message: 'Failed to fetch reviews from Google Places' } });
    }

    const data = await response.json();
    
    // Transform into the format expected by the frontend
    const testimonials = (data.reviews || []).map((r: any) => ({
      id: r.name,
      name: r.authorAttribution?.displayName || 'Unknown',
      role: 'Student', // Defaulting since Google doesn't provide role
      content: r.text?.text || r.originalText?.text || 'No content provided.',
      rating: r.rating || 5,
      avatar: r.authorAttribution?.photoUri || '',
      publishTime: r.publishTime
    }));

    // Sort by publish time descending
    testimonials.sort((a: any, b: any) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());

    res.json({ success: true, data: testimonials });
  } catch (err: any) {
    console.warn('getReviews error, falling back to empty reviews list:', err);
    res.json({ success: true, data: [] });
  }
};
