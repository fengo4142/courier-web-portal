# HELLO-SIGN
create template

set creds in .env like in .env.example

##How create new template:
```
node create-template.js FILENAME
```

##How get sign url by template id:
###NOTE please specify user fields in get-sign-url.js
```
node get-sign-url.js TEMPLATE_ID
```

##How request data (status, metadata, etc):
```
node get-sign-request.js REQUEST_ID
```

##How download result pdf:
```
node download-sign-request-file.js REQUEST_ID
```
