Package.describe({
  summary: "Just Complete - simple autocompletion for meteor"
});

Package.on_use(function (api) {
  api.use(['templating'], 'client');
  api.add_files(['lib/jcInput.html', 'lib/jcInput.js', 'lib/style.css'], 'client');
});
