require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// WhatsApp Business API credentials
const WHATSAPP_API_URL = 'https://graph.facebook.com/v13.0/';
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

app.post('/send-whatsapp', async (req, res) => {
  try {
    const { message, phone } = req.body;
    
    const response = await axios.post(
      `${WHATSAPP_API_URL}${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('WhatsApp API error:', error.response?.data);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});