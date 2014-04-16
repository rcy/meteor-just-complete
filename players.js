Players = new Meteor.Collection('players');

if (Meteor.isServer) {
  Meteor.startup(function () {
    Players.remove({});
    Players.insert({name: 'Wayne Gretzky', team: 'Edmonton Oilers', number: 99});
    Players.insert({name: 'Bobby Orr', team: 'Boston Bruins', number: 4});
    Players.insert({name: 'Gordie Howe', team: 'Detroit Red Wings', number: 9});
  });
}
