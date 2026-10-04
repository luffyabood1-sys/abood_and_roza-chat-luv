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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ROZA Chat 🐰</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@600&display=swap');
        
        body { 
          background-color: #ffe6f2; 
          color: #5a2a42; 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          text-align: center; 
          padding: 15px; 
          margin: 0;
        }
        
        .header-title {
          font-family: 'Great Vibes', 'Comic Sans MS', cursive, sans-serif;
          font-size: 48px;
          color: #d63384;
          margin: 5px 0;
          text-shadow: 2px 2px 4px #ffb3d9;
        }
        
        .subtitle {
          font-size: 18px;
          color: #b83280;
          margin-bottom: 15px;
          font-weight: bold;
        }

        #chat { 
          background: #ffffff; 
          height: 260px; 
          overflow-y: scroll; 
          padding: 12px; 
          border: 3px solid #ff99dd; 
          border-radius: 15px;
          margin: 0 auto 15px auto; 
          max-width: 500px;
          text-align: right; 
          box-shadow: 0px 4px 10px rgba(214, 51, 132, 0.15);
        }
        
        .msg-box {
          background-color: #fff0f6;
          border-right: 4px solid #ff66c4;
          padding: 6px 10px;
          margin-bottom: 8px;
          border-radius: 8px;
          font-size: 15px;
        }

        input[type="text"] { 
          padding: 10px; 
          font-size: 14px; 
          border: 2px solid #ffb3d9;
          border-radius: 10px;
          outline: none;
          margin: 3px;
          background: #fff;
        }
        
        input[type="text"]:focus {
          border-color: #d63384;
        }

        button { 
          padding: 10px 18px; 
          font-size: 15px; 
          background-color: #d63384;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          margin: 3px;
        }
        
        button:hover {
          background-color: #b83280;
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
                html += '<div class="msg-box"><b>🐰 ' + data[i].u + ':</b> ' + data[i].m + '</div>';
              }
              document.getElementById('chat').innerHTML = html;
            }
          };
          xhr.send();
        }, 2000);
      </script>
    </head>
    <body>
      <div class="header-title">✨ Roza ✨</div>
      <div class="subtitle">🐰 غرفة الشات الوردي 🐰</div>
      
      <div id="chat"></div>
      
      <form action="/send" method="POST" target="dummy">
        <input type="text" name="u" placeholder="اسمك 🐰" style="width: 25%;" required>
        <input type="text" name="m" placeholder="اكتب رسالتك هنا..." style="width: 50%;" required>
        <button type="submit">إرسال 🌸</button>
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
