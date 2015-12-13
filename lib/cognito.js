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
    loginToken = "api.twitter.com" + ";" + token + ";" + tokenSecret;
    AWS.config.region = 'eu-west-1';
  // initialize the Credentials object with our parameters
  	AWS.config.credentials = new AWS.GetOpenIdToken(credentials.identityPoolId(), loginToken);
    console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
    console.log("Cognito Identity: " + util.inspect(AWS.config.credentials));
  }
}
