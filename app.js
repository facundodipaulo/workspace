const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'tu-clave-secreta'; // Cambia esto con tu clave secreta

app.use(cors());
app.use(express.json());

// Middleware de autorización
const authorizeMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    req.user = decoded.user;
    next();
  });
};

app.use('/cart', authorizeMiddleware);

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/webfonts', express.static(path.join(__dirname, 'webfonts')));
app.use('/emercado_api', express.static(path.join(__dirname, 'emercado_api')));

app.get('/:filename.html', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `${filename}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

app.get('/api/:subfolder/:filename?', (req, res) => {
  const subfolder = req.params.subfolder;
  const filename = req.params.filename;

  const subfolderPath = path.join(__dirname, 'emercado_api', subfolder);

  if (filename) {
    const filePath = path.join(subfolderPath, filename);

    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      res.json(JSON.parse(jsonData));
    } else {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  } else {
    const files = fs.readdirSync(subfolderPath);
    res.json({ files });
  }
});

app.post('/login', (req, res) => {
  const { user, password } = req.body;

  if (user === 'ElonMusk@god.com' && password === 'contraseña') {
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

app.get('/index', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

app.get('/cart', (req, res) => {
  const user = req.user;

  // Lógica para la ruta /cart aquí

  res.json({ message: 'Ruta /cart accesible solo para usuarios autenticados', user });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
