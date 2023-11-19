const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key'; // Cambia esto con tu clave secreta

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde las carpetas 'js', 'css', 'img', 'webfonts' y 'emercado_api'
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/webfonts', express.static(path.join(__dirname, 'webfonts')));
app.use('/emercado_api', express.static(path.join(__dirname, 'emercado_api')));

// Ruta para obtener un archivo HTML específico
app.get('/:filename.html', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `${filename}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

// Ruta para obtener un archivo JSON específico o una lista de archivos en la subcarpeta
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

// Nuevo endpoint para autenticación y generación de token
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  // Ejemplo simple de autenticación (reemplázalo con tu lógica real)
  if (user === 'ElonMusk@god.com' && password === 'contraseña') {
    // Autenticación exitosa, genera un token
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' }); // El token expirará en 1 hora

    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Ruta para acceder al archivo index.html dentro de la carpeta global 'workspace'
app.get('/index', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
