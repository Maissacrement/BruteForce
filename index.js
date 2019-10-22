const { spawn } = require('child_process');
const omega = 'abcdef0123456789';
const target = './source/WebTarget.zip';
const passwordTable = [];
const hashCount = 32;

for(let i=0;i<hashCount;i++) {
  passwordTable.push(omega[0]);
}

const parsePasswordArray = () => {
  const newPass = passwordTable.join();

  return newPass.replace(/[.\,$+]/g, '');
}

const bruteForce = (password) => {
  const tryPasswordBruteForce = spawn('7z', [`${target}`, `-P${password}`]);

  tryPasswordBruteForce.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  tryPasswordBruteForce.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  tryPasswordBruteForce.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

const pass =  parsePasswordArray();

console.log('Voici mon pass', pass);
