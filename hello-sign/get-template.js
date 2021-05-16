const currentConfig = require('./config');
const hellosign = require('hellosign-sdk')({ key: currentConfig.key });
process.argv.forEach(function(val, index, array) {
  if (index === 2) {
    currentConfig.signatureRequest = val;
  }
});
hellosign.template.list().then((res) => {
  // handle response

  console.log(res)
}).catch((err) => {
  // handle error
});
