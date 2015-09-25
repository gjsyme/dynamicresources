Tracker.autorun(function(){
  Meteor.subscribe("resources");
});

var getOptions = function(resourceType){
  return Resources.find({parent: resourceType});
};

Template.registerHelper('allPages', function(){
  return Resources.find();
});

var homeHelper = {};
homeHelper.choices = getOptions("home");
Template.home.helpers(homeHelper);

Template.buttonOption.helpers({
  'isLink': function(link){
    if(link.indexOf("http")==0) return true;
    return false;
  }
});
Template.editSelect.helpers({
  'resources': function(){
    return Resources.find();
  }
});

var saveResource = function(event){
  event.preventDefault();
  var name = event.target.name.value;
  var parent = event.target.parentPage.selectedOptions[0].value;
  var title = event.target.pagetitle.value;
  var body = event.target.pagebody.value;
  Meteor.subscribe("insertResource", name, parent, title, body);


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
  var idString = event.target.id.value;
  var nameString = event.target.name.value;
  var parentString = event.target.parentPage.selectedOptions[0].value;
  var titleString = event.target.pagetitle.value;
  var bodyString = event.target.pagebody.value;

  Meteor.subscribe("updateResource", idString, nameString, parentString, titleString, bodyString);
}

var editEvents = {};
editEvents["submit form"] = updateResource;
Template.edit.events(editEvents);

var deleteRecord = function(event){
  console.log("in deleteRecord");
  var targetRecord = event.target.id;
  console.log("delete "+targetRecord);
  Resources.remove({_id: targetRecord});
}
var buttonEvents = {};
buttonEvents["click .btn-delete"] = deleteRecord;
Template.buttonOption.events(buttonEvents);

Template.body.helpers();
