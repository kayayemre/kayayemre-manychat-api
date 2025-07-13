// api/saveCustomer.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST istekleri kabul edilir.' });
  }

  const { fullName, phone, message, date, checkin, checkout, adults, children, childAges } = req.body;

  const { data, error } = await supabase.from('customers').insert([
    {
      full_name: fullName,
      phone,
      message,
      date,
      checkin,
      checkout,
      adults,
      children,
      child_ages: childAges,
    },
  ]);

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true, data });
}
