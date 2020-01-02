## Getting Started
```
# yarn:
yarn add --dev jest
# Or npm:
npm install --save-dev jest
```
> Note: Jest documentation uses yarn commands, but npm will also work. You can compare yarn and npm commands in the yarn docs, here.
Jest使用yarn命令，但是npm也可以工作，你可以通过yarn文档对比yarn和npm的不同。
Let's get started by writing a test for a hypothetical function that adds two numbers. First, create a sum.js file:
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
Then, create a file named sum.test.js. This will contain our actual test:
```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
Add the following section to your package.json:
```
{
  "scripts": {
    "test": "jest"
  }
}
```
Finally, run yarn test or npm run test and Jest will print this message:
```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```
You just successfully wrote your first test using Jest!
### Methods
+ afterAll(fn, timeout)
+ afterEach(fn, timeout)
+ beforeAll(fn, timeout)
+ beforeEach(fn, timeout)
+ describe(name, fn)
+ describe.each(table)(name, fn, timeout)
+ describe.only(name, fn)
+ describe.only.each(table)(name, fn)
+ describe.skip(name, fn)
+ describe.skip.each(table)(name, fn)
+ test(name, fn, timeout)
+ test.each(table)(name, fn, timeout)
+ test.only(name, fn, timeout)
+ test.only.each(table)(name, fn)
+ test.skip(name, fn)
+ test.skip.each(table)(name, fn)
+ test.todo(name)