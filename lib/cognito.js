var AWS = require('aws-sdk');
var util = require('util');
var credentials = require('../credentials');

module.exports = {
  initialize: function() {

  // set the Amazon Cognito region
  	AWS.config.region = 'eu-west-1';
  // initialize the Credentials object with our parameters
  	AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials.identityPoolId());

  // We can set the get method of the Credentials object to retrieve
  // the unique identifier for the end user (identityId) once the provider
  // has refreshed itself
  	AWS.config.credentials.get(function(err) {
      		if (err) {
          		console.log("Error: "+err);
          		return;
      		}
      		console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
  		    console.log("Cognito Identity: " + util.inspect(AWS.config.credentials));
  	});
  },
  login: function(token, tokenSecret) {
    console.log("Cognito login function", token, tokenSecret);

    var cognitoidentity = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});
    AWS.config.region = 'eu-west-1';

    loginToken =  token + ";" + tokenSecret;

    console.log("OpenID loginToken", loginToken);

    params = {
      IdentityPoolId: credentials.identityPoolId().IdentityPoolId, /* required */
      Logins: {
        "api.twitter.com": loginToken
      }
    };
    cognitoidentity.getId(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data);           // successful response
        var params1 = {
          IdentityId: data, /* required */
        };
        cognitoidentity.getCredentialsForIdentity(params1, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
      };
    });


    //console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
    //console.log("Cognito Identity: " + util.inspect(AWS.config.credentials));
  }
}
