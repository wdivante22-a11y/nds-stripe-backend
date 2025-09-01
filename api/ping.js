// api/ping.js
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    priceIdPresent: !!process.env.PRICE_ID,
    priceIdStartsWith: process.env.PRICE_ID ? process.env.PRICE_ID.slice(0, 6) : null,
    keyPresent: !!process.env.STRIPE_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV || null,
  });
}