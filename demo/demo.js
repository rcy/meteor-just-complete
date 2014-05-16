if (Meteor.isClient) {
  Template.demo.events({
    'change input[name=playerId]': function (e) {
      var playerId = $(e.target).val();
      console.log('selected', Players.findOne(playerId));
    }
  });
}
