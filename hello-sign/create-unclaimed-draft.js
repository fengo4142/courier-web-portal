let currentConfig = require('./config')

process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    currentConfig.templateId = val
  }
})
//driverName
//driverAddress1
//driverAddress2
//DateSigned
const hellosign = require('hellosign-sdk')({ key: currentConfig.key })

const opts = {
  test_mode: currentConfig.testMode,
  clientId: currentConfig.clientId,
  template_id: currentConfig.templateId,
  signers: [
    {
      email_address: 'alice@example.com',
      name: 'Alice',
      role: 'Client',
    },
  ],
  merge_fields:[
    {name:'driverName',value:'driverName driverName2'},
    {name:'driverAddress1:',value:'driverAddre ss1driverA ddress1'},
    {name:'driverAddress2:',value:'driverAddress2 driverAddress2driverAddress2'}
  ],
  requester_email_address: 'charlie@example.com',
}
const f = async () => {
  let res,res2,signatureID
  try {
    const res = await hellosign.unclaimedDraft.createEmbeddedWithTemplate(opts)
    signatureID = res.unclaimed_draft.signature_request_id
    console.log('claim_url',res.unclaimed_draft.claim_url)
    console.log('SIGNATURE_ID', signatureID);
  }catch (e) {
    console.log('unclaimedDraft err', e);
  }
  try {
    res2 = await hellosign.unclaimed.getSignUrl(signatureID);
    console.log()
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
}
f()
