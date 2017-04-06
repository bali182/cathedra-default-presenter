import presenter from '../src'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('default presenter', () => {
  const loadOutput = name => JSON.parse(readFileSync(join(__dirname, 'output', `${name}.json`), 'utf-8'))

  const loadLog = name => readFileSync(join(__dirname, 'expected', `${name}.log`), 'utf-8')

  const mockLog = () => {
    const contents = []
    const logger = input => contents.push(input)
    logger.logs = () => contents.join('\n')
    return logger
  }

  const assertLog = name => () => {
    const log = mockLog()
    const output = loadOutput(name)
    const expectedLog = loadLog(name)
    presenter({ log })(output)
    expect(log.logs()).toBe(expectedLog)
  }

  it('should present a simple benchmark correctly', assertLog('simple-benchmark'))

  it('should present a simple suite correctly', assertLog('simple-suite'))

  it('should present a suite with 3 benchmarks correctly', assertLog('suite-with-3-benchmarks'))

  it('should present a complex suite correctly', assertLog('complex-suite'))
})
