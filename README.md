# cognito-demo
Demo of Cognito 

# For running this demo you need to create a file called credentials.js in the root directory of your application with the following structure

```
module.exports = {
        identityPoolId: function() {
                return { IdentityPoolId: "eu-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" }
        }
}
```

Please bear in mind to check the region!
