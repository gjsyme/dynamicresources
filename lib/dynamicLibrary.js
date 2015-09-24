Resources = new Mongo.Collection("resources");
ClickTracker = new Mongo.Collection("clicks");
//ClickReport = new Mongo.Collection("clickReport");

Router.route('/', function(){
  this.render('home');
});

Router.route('/admin/list_resources', function(){
  var resources = Resources.find();

  this.render('datapage', {
    data: function(){
      return{
        records: resources,
      }
    }
  });
});

Router.route('/admin/manage_db/:collection', function(){
  var collectionName = this.params.collection;
  var collection;
  if(collectionName==="Resources"){
    collection = Resources.find();
    this.render('manageResources', {
      data: function(){
        return{
          title: "Manage Collection: "+collectionName,
          records: collection
        }
      }
    });
  }else if(collectionName==="ClickTracker"){
    //console.log("in clicktracker");
    collection = ClickTracker.find();
    console.log(collection.fetch().length);
    this.render('manageClicks', {
      data: function(){
        return{
          title: "Manage Collection: "+collectionName,
          records: collection
        }
      }
    });
  }else if(collectionName==="Users"){
    collection = Users.find();
    this.render('manageUsers', {
      data: function(){
        return{
          title: "Manage Collection: "+collectionName,
          records: collection
        }
      }
    });
  }else{
    collection = [];
    this.redirect('/');
  }
});

Router.route('/admin/report_clicks', function(){
  var ret = ClickTracker.find({user: Meteor.userId()}).count();
  console.log(ret);
  this.render('reportClickCount', {
    data: function(){
      return {
        records: ret
      }
    }
  });
});

Router.route('/resources/add', function(){
  this.render('addResource');
});
Router.route('/resource/add', function(){
  this.render('addResource');
});

Router.route('/content/:_id', function(){
  // Meteor.call("writeClick", Meteor.userId(), "/content/"+this.params._id);
  ClickTracker.insert({user: Meteor.userId(), target: "/content/"+this.params._id});
  var record = Resources.findOne({_id: this.params._id});
  console.log(Meteor.userId());
  var children = Resources.find({parent: record.category, user: Meteor.userId()});
  var ret = children.fetch();
  for(var i=0; i<ret.length; i++){
    if(ret[i].target.indexOf('//')==0){
      ret[i]._id = '';
    }
  }
  this.render('content', {
    data: function(){
      return{
        title: record.title,
        body: record.body,
        children: ret
      }
    }
  });
});

Router.route('/stub/:_id', function(){
  ClickTracker.insert({user: Meteor.userId(), target: "/stub/"+this.params._id});
  var record = Resources.findOne({_id: this.params._id});
  console.log(Meteor.userId());
  this.render('stub', {
    data: function(){
      return{
        title: record.title,
        body: record.body
      }
    }
  })
})

if (Meteor.isClient) {}

if (Meteor.isServer) {}
