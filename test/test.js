const app = require('../src/app');
const http = require('http');

// NOTA IMPORTANTE: El hostname debe ser el alias de la red de Docker
// que definimos en el ci-cd.yml: --network-alias app-server
const options = {
  hostname: 'app-server', 
  port: 3000, 
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Código de estado de la prueba: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('✅ Prueba de conexión exitosa: Código 200.');
    // No necesitamos app.close() si lo ejecutamos en un contenedor separado
    process.exit(0); 
  } else {
    console.error('❌ Prueba fallida: Código de estado incorrecto.');
    // No necesitamos app.close() si lo ejecutamos en un contenedor separado
    process.exit(1);
  }
});

req.on('error', (e) => {
  console.error(`❌ Error en la solicitud de prueba. El servidor puede no estar accesible en '${options.hostname}:${options.port}': ${e.message}`);
  // Error de red, salimos con error
  process.exit(1); 
});

req.end();

// Pequeño timeout de seguridad para evitar que el proceso cuelgue
setTimeout(() => {
    console.error("❌ La prueba ha superado el tiempo de espera (Timeout).");
    process.exit(1);
}, 20000);