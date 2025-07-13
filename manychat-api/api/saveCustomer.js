export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const {
    ad_soyad,
    telefon,
    otel_adi,
    mesaj,
    fiyat,
    durum = "bekliyor",
    not = ""
  } = req.body;

  if (!ad_soyad || !telefon || !otel_adi || !mesaj || !fiyat) {
    return res.status(400).json({ message: "Eksik bilgi" });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/musteriler`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify({
      ad_soyad,
      telefon,
      otel_adi,
      mesaj,
      fiyat,
      durum,
      not
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Supabase insert hatası:", data);
    return res.status(500).json({ message: "Veri kaydedilemedi", error: data });
  }

  return res.status(200).json({ message: "Başarıyla kaydedildi", data });
}
