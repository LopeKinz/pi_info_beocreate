const os = require('os');
const fs = require('fs');

const piInfo = {
  model: '',
  processor: '',
  cores: '',
  memory: '',
  storage: '',
  os: '',
  ip: ''
};

// Get the Raspberry Pi model
try {
  const cpuInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
  const modelMatch = cpuInfo.match(/model name\s+:\s+(.*)/);
  if (modelMatch) {
    piInfo.model = modelMatch[1];
  }
} catch (err) {}

// Get the Raspberry Pi processor
try {
  const cpuInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
  const processorMatch = cpuInfo.match(/Hardware\s+:\s+(.*)/);
  if (processorMatch) {
    piInfo.processor = processorMatch[1];
  }
} catch (err) {}

// Get the number of Raspberry Pi cores
piInfo.cores = os.cpus().length;

// Get the Raspberry Pi memory
piInfo.memory = Math.floor(os.totalmem() / 1024 / 1024) + 'MB';

// Get the Raspberry Pi storage
try {
  const df = fs.readFileSync('/etc/mtab', 'utf8');
  const dfLines = df.split('\n');
  for (let i = 0; i < dfLines.length; i++) {
    const parts = dfLines[i].split(' ');
    if (parts.length >= 3 && parts[1] === '/') {
      piInfo.storage = Math.floor(parseInt(parts[2]) / 1024 / 1024) + 'GB';
      break;
    }
  }
} catch (err) {}

// Get the Raspberry Pi operating system
piInfo.os = os.release();

// Get the Raspberry Pi IP address
piInfo.ip = Object.values(os.networkInterfaces())
  .flat()
  .filter(details => details.family === 'IPv4' && !details.internal)
  .map(details => details.address)[0];

module.exports = piInfo;
