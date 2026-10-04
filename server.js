const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));

let messages = [];

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>✨ ROZA CHAT 🐰</title>
      <style>
        body {
          background-color: #ffe6f2;
          color: #5a2a42;
          font-family: sans-serif;
          text-align: center;
          padding: 10px;
          margin: 0;
          overflow-x: hidden;
        }

        /* الأرانب المتطايرة في الخلفية */
        .rabbit-bg {
          position: fixed;
          top: -50px;
          font-size: 24px;
          opacity: 0.6;
          z-index: -1;
          animation: floatDown 8s linear infinite;
        }

        @keyframes floatDown {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.1; }
        }

        .r1 { left: 10%; animation-duration: 6s; animation-delay: 0s; }
        .r2 { left: 30%; animation-duration: 9s; animation-delay: 2s; }
        .r3 { left: 50%; animation-duration: 7s; animation-delay: 4s; }
        .r4 { left: 70%; animation-duration: 10s; animation-delay: 1s; }
        .r5 { left: 88%; animation-duration: 8s; animation-delay: 3s; }

        .title {
          font-size: 32px;
          color: #d63384;
          margin: 10px 0 5px 0;
          font-weight: bold;
        }

        .subtitle {
          color: #b83280;
          margin-bottom: 15px;
        }

        #chat {
          background: #ffffff;
          height: 250px;
          overflow-y: scroll;
          padding: 10px;
          border: 3px solid #ff99dd;
          border-radius: 12px;
          margin: 0 auto 15px auto;
          max-width: 480px;
          text-align: right;
        }

        .msg {
          background: #fff0f6;
          border-right: 4px solid #d63384;
          padding: 6px;
          margin-bottom: 6px;
          border-radius: 5px;
          font-size: 14px;
        }

        input[type="text"] {
          padding: 8px;
          border: 2px solid #ffb3d9;
          border-radius: 8px;
          margin: 2px;
        }

        input[type="submit"] {
          padding: 8px 15px;
          background: #d63384;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
      </style>
      <script type="text/javascript">
        setInterval(function() {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/msg', true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              var html = '';
              for (var i = 0; i < data.length; i++) {
                html += '<div class="msg"><b>🐰 ' + data[i].u + ':</b> ' + data[i].m + '</div>';
              }
              document.getElementById('chat').innerHTML = html;
            }
          };
          xhr.send();
        }, 2000);
      </script>
    </head>
    <body>

      <!-- الأرانب المتطايرة -->
      <div class="rabbit-bg r1">🐰</div>
      <div class="rabbit-bg r2">🐇</div>
      <div class="rabbit-bg r3">🐰</div>
      <div class="rabbit-bg r4">🐇</div>
      <div class="rabbit-bg r5">🐰</div>

      <div class="title">✨ ROZA ✨</div>
      <div class="subtitle">🌸 غرفة الشات الوردي والأرانب 🐰</div>

      <div id="chat"></div>

      <form action="/send" method="POST" target="dummy">
        <input type="text" name="u" placeholder="اسمك 🐰" style="width: 25%;" required>
        <input type="text" name="m" placeholder="الرسالة..." style="width: 48%;" required>
        <input type="submit" value="إرسال 🌸">
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
