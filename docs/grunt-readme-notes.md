> If you use grunt-readme, please read this section!

grunt-readme v0.5.0 uses Phaser, so there are a few breaking changes primarily related to syntax for variables and includes. This means your docs will need to be updated if you upgrade to Phaser, grunt-phaser, or grunt-readme v0.5.0.

Differences from grunt-readme pre-v0.5.0

* Change `[%= _.doc('foo.md') %}` to `[%= docs('foo') %]`
* Change `[%= safename %]` to `[%= safename() %]`
* Change `[%= shortname %]` to `[%= shortname() %]`