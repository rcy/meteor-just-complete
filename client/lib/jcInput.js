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
  'keyup input.jc': function (e) {
    Session.set(this.query, $(e.target).val());
    console.log('keyup', this);
  },
  'click [data-match]': function (e, t) {
    e.preventDefault();
    var id = $(e.currentTarget).data('match');
    var doc = window[t.data.collection].findOne(id);
    $(t.find('input.jc')).val(doc.name);
    $(t.find('input[type=hidden]')).val(doc._id);
    Session.set(t.data.query);
  }
});

JC = {
  _filters: {},
  filters: function (fns) {
    this._filters = fns;
  }
};
