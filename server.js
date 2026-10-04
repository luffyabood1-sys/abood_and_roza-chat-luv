const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

let messages = [];

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>غرفة الشات</title>
      <style>
        body { background: #111; color: #fff; font-family: sans-serif; text-align: center; padding: 10px; }
        #chat { background: #222; height: 250px; overflow-y: scroll; padding: 10px; border: 1px solid #444; margin-bottom: 10px; text-align: right; }
        input, button { padding: 10px; font-size: 15px; margin: 4px; }
      </style>
      <script>
        setInterval(function() {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/msg', true);
          xhr.onload = function() {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              var html = '';
              for (var i = 0; i < data.length; i++) {
                html += '<div style="margin-bottom:5px; border-bottom:1px solid #333;"><b>' + data[i].u + ':</b> ' + data[i].m + '</div>';
              }
              document.getElementById('chat').innerHTML = html;
            }
          };
          xhr.send();
        }, 1500);
      </script>
    </head>
    <body>
      <h2>غرفة الشات</h2>
      <div id="chat"></div>
      <form action="/send" method="POST" target="dummy">
        <input type="text" name="u" placeholder="اسمك" style="width: 25%;" required>
        <input type="text" name="m" placeholder="الرسالة" style="width: 50%;" required>
        <button type="submit">إرسال</button>
      </form>
      <iframe name="dummy" style="display:none;"></iframe>
    </body>
    </html>
  `);
});

app.get('/msg', (req, res) => res.json(messages));

app.post('/send', (req, res) => {
  if (req.body.u && req.body.m) {
    messages.push({ u: req.body.u, m: req.body.m });
    if (messages.length > 30) messages.shift();
  }
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Ready'));
