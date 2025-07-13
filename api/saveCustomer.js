export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST istekleri kabul edilir" });
  }

  try {
    const { ad_soyad, telefon, otel_adi, mesaj, fiyat } = req.body;

    // Supabase'e veri gönderimi
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/musteriler`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_API_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify({
        ad_soyad,
        telefon,
        otel_adi,
        mesaj,      // ✨ burada hiçbir parse, encode, replace yapmıyoruz
        fiyat
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
    
  } catch (err) {
    console.error("Sunucu hatası:", err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
