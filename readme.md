# JSVersion

Titanium Mobile app to detect the language features supported by the Titanium integrated JavaScript interpreter (V8 or JavaScript Core).

**Status:** ECMAScript 5 and JavaScript 1.6 appear to be fully supported on iOS and Android. JavaScript 1.7 is not supported on either

2014 January - Updated for Titanium 3.2 with additional tests for JavaScript 1.7, all of which fail on iOS 7 and Android 4.2x at this time. I've actually faked out the `let` and `yield` tests because those throw parse errors.

## References and notes

This app uses tests from @kangax's <a href="http://kangax.github.com/es5-compat-table/">ECMAScript 5 compatibility table</a> page to detect which JavaScript features are supported by the Titanium JavaScript interpreter on your device. Additional tests adapted from Mozilla's <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7'>What's new In JavaScript 1.7</a> page.

Note that these tests don't test full functionality or conformance with the ECMA-262 spec.

License: MIT