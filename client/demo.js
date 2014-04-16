RegExp.quote = function(str) {
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

JC.filters({
  myFilter: function (query) {
    console.log('myFilter', query);
    query = '\\b' + RegExp.quote(query);
    return Players.find({name: {$regex: query, $options: 'i'}});
  }
});
