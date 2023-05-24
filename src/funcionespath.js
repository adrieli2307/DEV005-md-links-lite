const fs = require('fs');
const path = require('path');


const existPath = process.argv[2];

// Función para validar las rutas 

const pathValid = (existPath) => {
  console.log(existPath)
    if (fs.existsSync(existPath)) {
      console.log("Sí existe");
      return true;
    } else {
      console.log("No existe");
      return false;
    }
  };

// Convertir si es relativa a absoluta 

const absolutePath = (existPath) => {
  if (path.isAbsolute(existPath)) {
    console.log("La ruta ya es absoluta");
    return existPath;
  } else {
    console.log("Convirtiendo la ruta en absoluta");
    return path.resolve(existPath);
  }
};


pathValid(existPath);
absolutePath(existPath);


module.exports = {
  pathValid,absolutePath,
};