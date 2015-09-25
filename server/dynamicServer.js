Meteor.startup(function(){
  Meteor.publish("resources", function(){
    return Resources.find();
  });

  Meteor.publish("insertResource", function(name, parent, title, body){
    Resources.insert({name: name, parent: parent, title: title, body: body});
  });

  Meteor.publish("updateResource", function(id, name, parent, title, body){
    Resources.update({_id: id}, {$set: {name: name, parent: parent, title: title, body: body}});
  })

  Meteor.publish("removeResourceById", function(id){
    Resources.remove({"_id": id});
  });
});
