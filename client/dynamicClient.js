Tracker.autorun(function(){
  Meteor.subscribe("resources", Meteor.userId());
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

var getOptions = function(resourceType){
  console.log(Resources.find({parent: resourceType}).fetch());
  return Resources.find({parent: resourceType});
};

Template.registerHelper('allPages', function(){
  return Resources.find();
});

var homeHelper = {};
homeHelper.choices = getOptions("home");
Template.home.helpers(homeHelper);

var saveResource = function(event){
  event.preventDefault();
  var name = event.target.name.value;
  var target = event.target.pageType.selectedOptions[0].value;
  var parent = event.target.parentPage.selectedOptions[0].value;
  var user = Meteor.userId();
  var title = event.target.pagetitle.value;
  var body = event.target.pagebody.value;
  console.log(target);
  console.log(parent);
  Meteor.subscribe("insertResource", name, target, parent, user, title, body);

  event.target.name.value = "";
  event.target.pagetitle.value = '';
  event.target.pagebody.value = '';
}
var deleteResource = function(event){
  event.preventDefault();
  Meteor.subscribe("removeResourceById", event.target.deletion.selectedOptions[0].value);
}

var resourceEvents = {};
resourceEvents["submit form.add"] = saveResource;
resourceEvents["submit form.delete-resource"] = deleteResource;
Template.addResource.events(resourceEvents);

var updateResource = function(){
  event.preventDefault();
  var idString = event.target._id.value;
  var nameString = event.target.name.value;
  var anchorString = event.target.target.value;
  var parentString = event.target.parent.value;
  var categoryString = event.target.category.value;
  var userString = event.target.user.value;
  var titleString = event.target.title.value;
  var bodyString = event.target.body.value;

  Meteor.subscribe("updateResource", idString, nameString, anchorString, parentString, categoryString, userString, titleString, bodyString);
}

var manageResourceEvents = {};
manageResourceEvents["submit form"] = updateResource;
Template.manageResource.events(manageResourceEvents);

var deleteRecord = function(event){
  console.log("in deleteRecord");
  var targetRecord = event.target.id;
  console.log("delete "+targetRecord);
  Resources.remove({_id: targetRecord});
}
var buttonEvents = {};
buttonEvents["click .btn-delete"] = deleteRecord;
Template.buttonOption.events(buttonEvents);

var logout = function(){
  Meteor.logout();
  location.reload();
}

var logoutEvent = {};
logoutEvent["click .btn-logout"] = logout;
Template.body.events(logoutEvent);

Template.body.helpers();
