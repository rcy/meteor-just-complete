quoteRe = function(str) {
  return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};


Template.jcInput.created = function () {
  this.data.query = 'jc-' + Random.id();
  Session.set(this.data.query);

  if (!Match.test(this.data.fields, String))
    throw new Meteor.Error('jcInput block helper missing fields');

  // The fields are comma/space seperated strings that determine which
  // fields in the collection to search.  The first field will be the
  // one inserted into the text field for display.
  this.data.fields = this.data.fields.split(/[, ]+/);

  if (!Match.test(this.data.collection, String))
    throw new Meteor.Error('jcInput collection not String');
};
Template.jcInput.destroyed = function () {
  Session.set(this.data.query);
};


function filter (collection, fields, query) {
  query = '\\b' + quoteRe(query);
  var expressions = fields.map(function (f) {
    var obj = {};
    obj[f] = {$regex: query, $options: 'i'};
    return obj;
  });
  return window[collection].find({$or: expressions}, {limit: 25});
}

Template.jcInput.helpers({
  matches: function () {
    var query = Session.get(this.query);
    if (this.collection && this.fields && query)
      return filter(this.collection, this.fields, query);
    else
      return [];
  }
});

Template.jcInput.events({
  'keyup input.jcShow': function (e) {
    Session.set(this.query, $(e.target).val());
  },
  'click [data-match]': function (e, t) {
    e.preventDefault();
    var id = $(e.currentTarget).data('match');
    var doc = window[t.data.collection].findOne(id);
    $(t.find('input.jcShow')).val(doc[t.data.fields[0]]);
    $(t.find('input.jcHide')).val(doc._id);
    $(t.find('input.jcHide')).trigger('change');
    Session.set(t.data.query);
  }
});

JC = {
  _filters: {},
  filters: function (fns) {
    this._filters = fns;
  }
};
