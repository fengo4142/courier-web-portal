let currentConfig = require('./config')

process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    currentConfig.templateId = val
  }
})

const hellosign = require('hellosign-sdk')({ key: currentConfig.key })

hellosign.embedded.getEditUrl(currentConfig.templateId).then((res) => {
  // handle response
  console.log('EDIT TEMPLATE')
  console.log(res)
  console.log(`
CONTINUE IN BROWSER:

1. please run this script in browser console:
============================================

var s = document.createElement('script');
s.type = 'text/javascript';
s.src = 'https://cdn.hellosign.com/public/js/embedded/v2.7.1/embedded.development.js';
document.getElementsByTagName('head')[0].appendChild(s);
setTimeout(()=>{
  const client = new window.HelloSign({
    clientId: '${currentConfig.clientId}',
  });
  client.open('${res.embedded.edit_url}',{
    skipDomainVerification:true,
  });
},1000)

============================================

TEMPLATE_ID = ${currentConfig.templateId}


  `)
}).catch((err) => {
  // handle error
  console.log(err)
})

