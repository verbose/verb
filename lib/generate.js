
function isGenerator(args) {
  return /:/.test(args._[0]);
}

if (isGenerator(argv)) {
  var seg = args._.slice().split(':');
  var generator = seg[0];
  var task = seg[1];
}
