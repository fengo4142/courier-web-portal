let currentConfig = require('./config')

process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    currentConfig.fileName = val
  }
})

const hellosign = require('hellosign-sdk')({ key: currentConfig.key })

const opts = {
  // test_mode: currentConfig.testMode,
  clientId: currentConfig.clientId,
  signer_roles: [
    {
      name: currentConfig.role,
      order: 0,
    },
  ],
  files: [currentConfig.fileName],
}

hellosign.template.createEmbeddedDraft(opts).then((res) => {
  // handle response
  console.log('DRAFT TEMPLATE')
  console.log(res.template)
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
  client.open('${res.template.edit_url}',{
    skipDomainVerification:true,
  });
},1000)

============================================

2. edit form and create template
3. save this template id for usage

TEMPLATE_ID = ${res.template.template_id}


  `)
}).catch((err) => {
  // handle error
  console.log(err)
})
//
// // const hellosign = require('hellosign-sdk')({ key: 'ce01cf112671b860ff087086f1a75894ff4ba048fd968e53a497814b4d1eea8d' });
// //
// // hellosign.template.list({ page: 1 }).then((res) => {
// //   // handle response
// //   console.log(res)
// // }).catch((err) => {
// //   // handle error
// //   console.log(err)
// // });
// //
// // hellosign.embedded.getEditUrl(templateId).then((res) => {
// //   // handle response
// //   console.log(res)
// // }).catch((err) => {
// //   // handle error
// //   console.log(err)
// // });
//
// const hellosign = require('hellosign-sdk')({ key: 'ce01cf112671b860ff087086f1a75894ff4ba048fd968e53a497814b4d1eea8d' })
//
// const opts = {
//   test_mode: 1,
//   clientId,
//   template_id: templateId,
//   // signing_redirect_url: 'http://example.com/signed',
//   // requesting_redirect_url: 'http://example.com/requested',
//   custom_fields: [
//     {
//       name: 'Alice',
//     },
//   ],
//   signers: [
//     {
//       email_address: 'druikos@gmail.com',
//       name: 'Alice',
//       role: 'Client',
//     },
//   ],
// }
//
// hellosign.signatureRequest.createEmbeddedWithTemplate(opts)
//   .then((res) => hellosign.embedded.getSignUrl(res.signature_request.signatures[0].signature_id)).then((res) => {
//   console.log('The sign url: ' + res.embedded.sign_url)
// }).catch((err) => {
//   // handle error
//   console.log(err)
// })
