#jasmine-sinon-clock

A utility that creates an API similar to Jasmine's clock() API but which uses Sinon's fake timers.

## Usage

```
var clock = require('jasmine-sinon-clock');
clock.install();
clock.tick(5);
clock.uninstall();
```

OR 

```
var jasmine = require('jasmine-sinon-clock').mockJasmine;
jasmine.clock().install();
jasmine.clock().tick(5);
jasmine.clock().uninstall();
```