import { green, red, yellow } from 'chalk'

export const operationsPerSecond = ({ operations, pureTime }) => operations / (pureTime / 1000)

export const enclosingSymbols = ({ isBest, isWorst }) => {
  let prefix = null
  let suffix = ''
  if (isBest && !isWorst) {
    prefix = green('√')
    suffix = green('(best)')
  } else if (isWorst && !isBest) {
    prefix = red('✖')
    suffix = red('(worst)')
  } else {
    prefix = yellow('●')
  }
  return [prefix, suffix]
}

export const indent = n => ' '.repeat(n)

export const merge = (...objects) => {
  const result = {}
  for (const object of objects) {
    const keys = Object.keys(object)
    const symbols = Object.getOwnPropertySymbols(object)
    for (const key of keys) {
      result[key] = object[key]
    }
    for (const symbol of symbols) {
      result[symbol] = object[symbol]
    }
  }
  return result
}

export const transformIf = condition => transform => input => {
  if (condition) {
    return transform(input)
  }
  return input
}
