## What are this? ##
This is a Meteor.js project that allows a user to create a fully customizable resource structure. This is really meant for the library community.

Final goal is to have a user account and an admin account per site, the user account seeing the product that is configured and monitored by the admin account. We're not there yet, obviously.

# Deployment Strategery #
For now, I think I'll put this on xxx.meteor.com (whatever xxx is to become i'll update).
Future, I will MUP it to the dev server.
https://github.com/arunoda/meteor-up


### List of operational routes ###
1. / - homepage
2. /admin/list_resources - view of all pages in the app
3. /admin/manage_db/Resources - view (with edit) of all pages in the app - you should only really want to change Title or Body fields for the sake of demonstration, if you would like to demo this at all
4. /admin/manage_db/ClickTracker - view (with edit) all clicks in the app (doesn't really make sense)
5. /admin/report_clicks - shows the total number of clicks driven by that user (needs some refinement)
6. /resources/add - allows manual creation of new buttons... don't really recommend doing this, but you CAN: just make sure that you put it on the home page (parent will be: home). First 3 fields are required, others are only if you have it be a /content page (internal page).
7. /resource/add - alias for /resources/add
8. /content/:_id - view the unique content for a specific page (pages are unique to each user - you can't see someone else's pages) - mostly this is just a note, as you get to these pages by clicking the buttons
