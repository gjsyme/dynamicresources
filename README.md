## What are this? ##
This is a Meteor.js project that allows a user to create a fully customizable resource structure. There are no notions of users / accounts in the current product, but those can be easily introduced by either rolling back commits or running
meteor add accounts-ui
in the CLI of the project directory.

# Deployment Strategery #
Docker all the way. The dockerfile will build the project into a self contained container.
You have to designate ROOT_URL and MONGO_URL upon launch on the docker server (I'm currently using atomic01).
MONGO is available on atomic01 as well (is running as a smallfile container).


### List of operational routes ###
1. / - homepage
2. /resources/add - manage the options here
