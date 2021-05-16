const currentConfig = {
  clientId: 'e60a2e80db14146ac3ce611f6b8aca5c',
  key: 'ce01cf112671b860ff087086f1a75894ff4ba048fd968e53a497814b4d1eea8d',
  testMode: '1',
  role: 'Client',
  templateId: '60e5942459363cd902e640cc8d81133f4711f602'
}

const hellosign = require('hellosign-sdk')({ key: currentConfig.key });

const opts = {
  test_mode: currentConfig.testMode,
  clientId: currentConfig.clientId,
  template_id: currentConfig.templateId,
  custom_fields: [
    { name: 'driverName', value: 'sadasdasdas asdasd', editor: currentConfig.role, required: true },
    { name: 'driverAddress1', value: 'driverAddress1 asdasd', editor: currentConfig.role, required: true },
    { name: 'driverAddress2', value: 'driverAddress2 asdasd', editor: currentConfig.role, required: false }
  ],
  metadata: {
    ourUserId: 'yagsdftyasduyagsduygasudyg'
  },
  signers: [
    {
      email_address: 'druikos@gmail.com',
      name: 'sdf sdfsdf',
      role: currentConfig.role
    }
  ]
};
let signatureID;

const f = async () => {
  let res;
  try {
    res = await hellosign.signatureRequest.createEmbeddedWithTemplate(opts);
  } catch (e) {
    console.log('signatureRequest err', e);
  }
  signatureID = res.signature_request.signatures[0].signature_id;
  console.log('SIGNATURE_ID', signatureID);
  let res2;
  try {
    res2 = await hellosign.embedded.getSignUrl(signatureID);
  } catch (e) {
    console.log('getSignUrl err', e);
  }
  console.log('The sign url: ' + res2.embedded.sign_url);
  console.log(`
  CONTINUE IN BROWSER:
please run this script in browser console:
============================================

var s = document.createElement('script');
s.type = 'text/javascript';
s.src = 'https://cdn.hellosign.com/public/js/embedded/v2.7.1/embedded.development.js';
document.getElementsByTagName('head')[0].appendChild(s);
setTimeout(()=>{
  const client = new window.HelloSign({
    clientId: '${currentConfig.clientId}',
  });
  client.open('${res2.embedded.sign_url}',{
    skipDomainVerification:true,
  });
},1000)
`);
};
f();

