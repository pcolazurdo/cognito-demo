var AWS = require('aws-sdk');
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
	});
}}
