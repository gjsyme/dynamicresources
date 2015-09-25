Meteor.startup(function(){
  Meteor.publish("resources", function(){
    return Resources.find();
  });

  Meteor.publish("insertResource", function(name, target, parent, user, title, body){
    Resources.insert({name: name, target: target, parent: parent, user: user, title: title, body: body});
  });

  Meteor.publish("updateResource", function(id, name, target, parent, category, user, title, body){
    Resources.update({_id: id}, {$set: {name: name, target: target, parent: parent, category: category, user: user, title: title, body: body}});
  })

  Meteor.publish("removeResourceById", function(id){
    Resources.remove({"_id": id});
  });
  
});
