const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta para obtener un archivo JSON específico
app.get('/api/:subfolder/:filename', (req, res) => {
  const subfolder = req.params.subfolder;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'emercado_api', subfolder, filename);

  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    // Leer el archivo y enviarlo como respuesta
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(jsonData));
  } else {
    // Si el archivo no existe, devolver un error 404
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
