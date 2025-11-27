const app = require('../src/app');
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000, // Debe coincidir con el puerto del contenedor/app
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Código de estado de la prueba: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('✅ Prueba de conexión exitosa: Código 200.');
    app.close();
    process.exit(0);
  } else {
    console.error('❌ Prueba fallida: Código de estado incorrecto.');
    app.close();
    process.exit(1);
  }
});

req.on('error', (e) => {
  console.error(`❌ Error en la solicitud de prueba: ${e.message}`);
  app.close();
  process.exit(1);
});

req.end();