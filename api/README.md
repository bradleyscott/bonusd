# bounsd RESTful API
A RESTful API implemented using the Sails.js framework (sailsjs.org) that wraps some of the functionality exposed by the blockchain's JSON RPC API and implements some business logic specific to a peer bonus scheme

## Authentication 
The URL /auth/google requires you to authorise bonusd to access your Google profile. You will then be granted a JSON web token that you can use in subsequent requests in the Authorization header as a Bearer token, or alternatively in a query string named access_token

