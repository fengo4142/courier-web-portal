const currentConfig = require('./config');
const hellosign = require('hellosign-sdk')({ key: currentConfig.key });
process.argv.forEach(function(val, index, array) {
  if (index === 2) {
    currentConfig.signatureRequest = val;
  }
});
hellosign.signatureRequest.get(currentConfig.signatureRequest).then((res) => {
  console.log(res.signature_request)
}).catch((err) => {
  console.log(err)
});

