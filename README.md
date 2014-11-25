# eventlib

## Installation
There are two ways you can install eventlib. The easiest, and recommended, way of doing this is to install the
package [through Bower](http://bower.io/).

Just create a bower.json file in your project:
```json
{
    "dependencies": {
        "cascade-eventlib": "1.0.0"
    }
}
```

Then, run the Bower command to install eventlib.
```
$ bower install
```

Alternatively, you can clone/download the repository and install the package manually.

## Basic Usage
### Creating The Publisher
The first thing that needs to be done is to create the publisher itself.
```javascript
var publisher = new Publisher(); // Referencing window.Publisher

// OR

var publisher = require('eventlib'); // Referencing the AMD module
```

### Adding/Removing Subscribers
Once the publisher has been created, you can begin attaching subscribers to it.
```javascript
var callback = function (data) {
    console.log(data.value);
};

publisher.subscribe('my-topic', callback);
```

Also, when you no longer have use for a subscriber, you may also remove it from the publisher itself.
```javascript
var callback = function (data) {
    console.log(data.value);
};

publisher.subscribe('my-topic', callback);

// [...]

publisher.unsubscribe('my-topic', callback);
```

### Publishing Topics
TODO

## Module Loaders
The eventlib library registers itself in one of two ways, automatically.

First, it will register itself to ```window.Publisher``` when running in a browser, allowing you access to the library
if you don't have any module loaders defined. This is particularly useful when using the library along with plain
javascript.

Secondly, the library will register itself if it finds an AMD loader present, such as [RequireJS](http://requirejs.org/).
It will register itself under the name ```eventlib```, allowing you to require the library and use it without any
additional work.

Example:
```javascript
var publisher = require('eventlib');

publisher.subscribe('my-topic', function () {});
```

## Contributing
We gladly accept pull requests and bug reports on the repository. If you have some good ideas, don't be shy, and share
away!

## Testing
All testing is covered by [Jasmine](https://jasmine.github.io/) 2.1.

To run tests, clone the repository and run ```bower install```. After bower finishes installing Jasmine, you can then
run the test suite by opening ```test/suite.html``` in the browser you wish to run tests.

## License
The eventlib library is MIT licensed, and free for anyone to use and modify.

```
Copyright (c) 2014-2015 Cascade Media, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
