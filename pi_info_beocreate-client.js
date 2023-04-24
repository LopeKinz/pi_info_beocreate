const piInfoElement = document.getElementById('pi-info');

fetch('/api/my-extension')
  .then(response => response.json())
  .then(piInfo => {
    piInfoElement.innerHTML = `
      <p><strong>Model:</strong> ${piInfo.model}</p>
      <p><strong>Processor:</strong> ${piInfo.processor}</p>
      <p><strong>Cores:</strong> ${piInfo.cores}</p>
      <p><strong>Memory:</strong> ${piInfo.memory}</p>
      <p><strong>Storage:</strong> ${piInfo.storage}</p>
      <p><strong>OS:</strong> ${piInfo.os}</p>
      <p><strong>IP Address:</strong> ${piInfo.ip}</p>
    `;
  });
