# Testing guidelines

The following are not hard and fast rules you have to follow, but instead guidelines to keep tests meaningful.

## General rules to follow

1.  Will the test have to duplicate application code? This will make it brittle.
  * Testing css styles would fall under this as it requires duplicating application code and thus making it brittle. The test should be flexible and not require duplicating code.
2.  Will making assertions in the test duplicate any behavior that is already covered by (and the responsibility of) library code?
  * Prop-types will not be tested