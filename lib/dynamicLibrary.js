Resources = new Mongo.Collection("resources");

Router.route('/', function(){
  this.render('home');
});

Router.route('/resources/add', function(){
  this.render('addResource');
});

Router.route('/content/:_id', function(){
  var record = Resources.findOne({_id: this.params._id});
  var children = Resources.find({parent: record._id});
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
        id: this.params._id,
        children: ret
      }
    }
  });
});

Router.route('/edit/:_id', function(){
  if(this.params._id==undefined){
    this.render('editSelect');
  }
  var record = Resources.findOne({_id: this.params._id});
  this.render('edit', {data: function(){return {record: record}}});
});
Router.route('/edit', function(){
  this.render('editSelect');
});

Router.route('/stub/:_id', function(){
  var record = Resources.findOne({_id: this.params._id});
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
