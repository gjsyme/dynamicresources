Meteor.startup(function(){
  Meteor.publish("resources", function(){
    if(this.userId){
      return Resources.find();
    }else{
      return [];
    }
  });
  Meteor.publish("clicks", function(){
    if(this.userId){
      return ClickTracker.find();
    }else{
      return [];
    }
  });
  Meteor.publish("writeClick", function(target, user){
    Clicks.insert({user: user, target: target});
  });
  Meteor.publish("insertResource", function(name, target, parent, category, user, title, body){
    Resources.insert({name: name, target: target, parent: parent, category: category, user: user, title: title, body: body});
  });
  Meteor.publish("updateResource", function(id, name, target, parent, category, user, title, body){
    Resources.update({_id: id}, {$set: {name: name, target: target, parent: parent, category: category, user: user, title: title, body: body}});
  })
  Meteor.publish("removeResourceByTarget", function(targetString){
    Resources.remove({target: targetString});
  });
  Meteor.publish("removeResourceByName", function(targetString){
    Resources.remove({name: targetString});
  });
  Meteor.publish("removeResourceById", function(id){
    Resources.remove({"_id": id});
  });
  Meteor.publish("clickReport", function(){
    ClickTracker.aggregate([{$group: {_id: "$user", count: {$sum: 1}}}]);
  });
});
