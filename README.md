# React Truncate String

> Truncate strings like butter.

<p align="center">
    <img src="https://img.ziggi.org/5Rjsznl9.png" />
</p>

[![Build Status](https://travis-ci.org/albinotonnina/react-truncate-string.svg?branch=master)](https://travis-ci.org/albinotonnina/react-truncate-string)

## Features

### It truncates long long long long...long long strings in the middle!

## Requirements

This library relies on spaces for truncation. Thanks [@dschinkel](https://github.com/dschinkel) for [pointing that out](https://github.com/albinotonnina/react-truncate-string/issues/7).

## demo: https://albinotonnina.github.io/react-truncate-string

🚀 ultra-blazingly-fast

🌈 ultra-light: 1.76 KB

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Demos](#demos)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [TODO](#todo)
- [License](#license)

## Install

```
yarn add react-truncate-string
```

## Usage

### Truncate in the middle of the string

```jsx
import TruncateString from 'react-truncate-string'

...

render(){

    return  <TruncateString text="your long string" />
}
```

### Truncate the string at 90%

```jsx
import TruncateString from 'react-truncate-string'

...

render(){
    return  <TruncateString text="your long string" truncateAt={90} />
}
```

## Demos

https://albinotonnina.github.io/react-truncate-string

https://codesandbox.io/s/xvv9r5ozo

## Maintainers

[@albinotonnina](https://github.com/albinotonnina)

## Contribute

PRs accepted.

## TODO

- truncate by words?
- min start and end characters option?
- change debounce time with option?

## License

MIT © 2020 Albino Tonnina
