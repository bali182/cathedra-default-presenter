# cathedra [![Build Status](https://travis-ci.org/bali182/cathedra-default-presenter.svg?branch=master)](https://travis-ci.org/bali182/cathedra-default-presenter)

Default presenter for [cathedra](https://github.com/bali182/cathedra)

### Usage

```js
const defaultPresenter = require('cathedra-default-presenter')
const { benchmark, suite } = require('cathedra')

const benchResult = benchmark(someFunction)
const suiteResult = suite(
  someFunction,
  otherFunction,
  thirdFunction
)

const presenter = defaultPresenter({ 
  log: console.log.bind(console) 
})

presenter(benchResult) 
presenter(suiteResult)
```