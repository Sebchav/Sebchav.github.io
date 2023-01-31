// Ejemplo de código en Node.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PAGE_ACCESS_TOKEN = 'EAAvlCXmkrFwBAFXThzWoKikX4QKWfoPK3wIzrY3veEpWtgBlomjMZBRGGAaisIlfe4F5v2XiJrKox9pyWmLGHAh4PkZB4n0ARajZCsau30ugBKigCTAZAMqeAXHZArthEKK0yYCc91ZAhL45XFi28AQMNcqlKuCOCayzqUjHZAUdUFe8On4uCMo';

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const body = req.body;
  
  // Verifica que la solicitud proviene de Facebook
  if (body.object === 'page') {
    body.entry.forEach(async entry => {
      const webhookEvent = entry.messaging[0];
      const senderPsid = webhookEvent.sender.id;
      const message = webhookEvent.message;

      // Verifica si el mensaje contiene texto
      if (message.text) {
        // Envía una respuesta personalizada al usuario
        await sendMessage(senderPsid, { text: 'Gracias por enviar un mensaje!' });
      }
    });
  }

  // Devuelve una respuesta vacía
  res.status(200).send('EVENT_RECEIVED');
});

// Envía una respuesta a la API de Messenger
async function sendMessage(recipientId, message) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v8.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: {
          id: recipientId
        },
        message
      }
    );
    console.log('Mensaje enviado:', response.data);
  } catch (error) {
    console.error(error);
  }
}

// Arranca el servidor
const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`El servidor está escuchando en el puerto ${port}`));


const axios = require('axios');

const API_KEY = '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';
const MODEL_ENGINE = 'text-davinci-003';

async function generateText(prompt) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/engines/' + MODEL_ENGINE + '/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      data: {
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.5
      }
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

// Usage

const prompt = 'Describe el uso de Axios en javascript';
generateText(prompt).then(output => {
  console.log(output);
});