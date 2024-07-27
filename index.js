const fs = require('fs');

const payload = [];

for (let i = 0; i < 100; i++) {
  payload.push({
    to: '558189982133@s.whatsapp.net',
    message: `Test message ${i + 1}`, // Mensagens simples e sem caracteres especiais
  });
}

fs.writeFileSync('simple-payload.json', JSON.stringify(payload, null, 2));
console.log('Simple payload generated');
console.log(payload); // Adicionando log para verificação
