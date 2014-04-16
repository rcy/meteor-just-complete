RegExp.quote = function(str) {
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};


Template.jcInput.created = function () {
  this.data.query = 'jc-' + Random.id();
  Session.set(this.data.query);
};
Template.jcInput.destroyed = function () {
  Session.set(this.data.query);
};


function filter (collection, fields, query) {
  query = '\\b' + RegExp.quote(query);
  var expressions = fields.map(function (f) {
    var obj = {};
    obj[f] = {$regex: query, $options: 'i'};
    return obj;
  });
  return window[collection].find({$or: expressions});
}

Template.jcInput.helpers({
  matches: function () {
    var query = Session.get(this.query);
    if (this.collection && this.fields && query)
      return filter(this.collection, this.fields.split(/[, ]+/), query);
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
