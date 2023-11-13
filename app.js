const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta para obtener un archivo JSON específico o una lista de archivos en la subcarpeta
app.get('/api/:subfolder/:filename?', (req, res) => {
  const subfolder = req.params.subfolder;
  const filename = req.params.filename;

  // Construir la ruta de la subcarpeta
  const subfolderPath = path.join(__dirname, 'emercado_api', subfolder);

  // Verificar si se proporcionó un nombre de archivo
  if (filename) {
    const filePath = path.join(subfolderPath, filename);

    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
      // Leer el archivo y enviarlo como respuesta
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      res.json(JSON.parse(jsonData));
    } else {
      // Si el archivo no existe, devolver un error 404
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  } else {
    // Si no se proporcionó un nombre de archivo, obtener la lista de archivos en la subcarpeta
    const files = fs.readdirSync(subfolderPath);
    res.json({ files });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
