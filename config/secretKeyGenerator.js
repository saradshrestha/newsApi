// secretKeyGenerator.js

const fs = require('fs');
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

// Read the existing .env file
const envFilePath = '.env';

let envContent = '';
if (fs.existsSync(envFilePath)) {
  envContent = fs.readFileSync(envFilePath, 'utf8');
}

// Check if SECRET_KEY already exists, and replace it
if (envContent.includes('SECRET_KEY=')) {
  const updatedEnvContent = envContent.replace(/SECRET_KEY=.*/, `SECRET_KEY=${secretKey}`);
  fs.writeFileSync('.env', updatedEnvContent.trim() + '\n');
} else {
  // Append the SECRET_KEY to the .env file
  fs.writeFileSync('.env', envContent.trim() + `\nSECRET_KEY=${secretKey}\n`);
}

console.log('.env file updated with the new secret key.');
