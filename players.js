Players = new Meteor.Collection('players');

if (Meteor.isServer) {
  Meteor.startup(function () {
    Players.remove({});
    Players.insert({name: 'wayne gretzky'});
    Players.insert({name: 'bobby orr'});
    Players.insert({name: 'gordie howe'});
  });
}
