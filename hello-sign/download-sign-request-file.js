const currentConfig = require('./config');
const fs = require('fs');
const hellosign = require('hellosign-sdk')({ key: currentConfig.key });
process.argv.forEach(function(val, index, array) {
  if (index === 2) {
    currentConfig.signatureRequest = val;
  }
});

hellosign.signatureRequest.download(currentConfig.signatureRequest, { file_type: 'pdf' }, (err, res) => {
  const file = fs.createWriteStream('file.pdf');

  res.pipe(file);

  file.on('finish', () => {
    file.close();
  });
});
