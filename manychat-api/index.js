const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const SUPABASE_URL = "https://knnfjuslcmrixhlcejag.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubmZqdXNsY21yaXhobGNlamFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTEzMjksImV4cCI6MjA2Nzk4NzMyOX0.QlNLG7cZlMWTc3NeKQMvtKJ36bpiBuSpbWwscAZND5I";

app.post("/save-customer", async (req, res) => {
  const {
    ad_soyad,
    telefon,
    otel_adi,
    mesaj,
    fiyat,
    durum = "bekliyor",
    not = "",
  } = req.body;

  if (!ad_soyad || !telefon || !otel_adi || !mesaj || !fiyat) {
    return res.status(400).json({ message: "Eksik bilgi var" });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/musteriler`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        ad_soyad,
        telefon,
        otel_adi,
        mesaj,
        fiyat,
        durum,
        not,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("Supabase hatası:", data);
      return res
        .status(500)
        .json({ message: "Supabase kaydı başarısız", error: data });
    }

    res.status(200).json({ message: "Başarıyla kaydedildi", data });
  } catch (error) {
    console.error("Sunucu hatası:", error);
    res.status(500).json({ message: "Sunucu hatası", error });
  }
});

app.get("/", (req, res) => {
  res.send("Manychat API hazır 🚀");
});

app.listen(3000, () => {
  console.log("Server çalışıyor: http://localhost:3000");
});
