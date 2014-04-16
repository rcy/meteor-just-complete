Template.jcInput.created = function () {
  this.data.query = 'jc-' + Random.id();
  Session.set(this.data.query);
};
Template.jcInput.destroyed = function () {
  Session.set(this.data.query);
}

Template.jcInput.helpers({
  matches: function () {
    console.log('matches', this, filter);
    var filter = JC._filters[this.filter];
    var query = Session.get(this.query);
    if (filter && query)
      return filter(query);
    else
      return [];
  }
});

Template.jcInput.events({
  keyup: function (e) {
    Session.set(this.query, $(e.target).val());
    console.log('keyup', this);
  }
});

JC = {
  _filters: {},
  filters: function (fns) {
    this._filters = fns;
  }
};
