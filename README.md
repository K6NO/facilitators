### Facilitator v0.01

Built with the Pup boilerplate.
[Read the Documentation](http://cleverbeagle.com/pup) v.1.x

CUSTOMIZATION
Meteor 1.8.0.1
Node 6.14.4
React 16

Deployment:

Localhost and Galaxy
Use settings-development.json / settings-staging.json / settings-production.json for public and private params when running localhost:3000 or deploying to Galaxy.

Amazon Deployment
Use MeteorUp to deploy to Amazon. 
Create .deploy dir with mup.js and settings.json

MongoDB Schema
Simple Schema with aldeed:collection2-core
Note: "tags" is an array of numbers, corresponding to indexes. These indexes refer to the "tags" array in the localization files. Example: "tags" : [1, 5, 7] --> 
"category" is a string corresponding to a key. This key identifies the corresponding category in the localization files, under the "categories" object. Example: "category" : "deepeco" --> categories[deepeco] --> EN --> 'Deep ecology'


Localization
i18n - universe:i18n meteor package.
Localization files in imports/localizations
