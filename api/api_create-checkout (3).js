// api/create-checkout.js
import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // We expect the splash page to POST these two:
    const { success_url, cancel_url } = req.body || {};

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      // Use the URLs sent by the splash page; fall back to env if provided
      success_url: success_url || process.env.SUCCESS_URL || "https://example.com/success",
      cancel_url:  cancel_url  || process.env.CANCEL_URL  || "https://example.com/cancel",
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message || "server_error" });
  }
}