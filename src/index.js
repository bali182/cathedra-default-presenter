import { indent, operationsPerSecond, enclosingSymbols, merge, transformIf } from './utils'

export default ({ log = console.log.bind(console) } = {}) => {
  let presentAny = null

  const ifBench = transformIf(({ isBenchmark }) => isBenchmark)

  const presentBenchmark = (benchmark, indentation) => {
    const { name, opsPerSec = operationsPerSecond(benchmark) } = benchmark
    const [prefix, suffix] = enclosingSymbols(benchmark)
    log(`${indent(indentation)}${prefix} ${name} - ${opsPerSec.toFixed(4)} ops/s ${suffix}`)
  }

  const presentSuite = (suite, indentation) => {
    const { name, children } = suite

    const withMinMax = children.map(ifBench(input => merge(input, { opsPerSec: operationsPerSecond(input) })))

    const benchmarks = withMinMax.filter(({ isBenchmark }) => isBenchmark)

    // eslint-disable-next-line no-extra-parens
    const min = benchmarks.reduce((m, e) => m === null ? e : (operationsPerSecond(e) < operationsPerSecond(m) ? e : m), null)
    // eslint-disable-next-line no-extra-parens
    const max = benchmarks.reduce((m, e) => m === null ? e : (operationsPerSecond(e) > operationsPerSecond(m) ? e : m), null)

    const withBestAndWorst = withMinMax.map(ifBench(input => merge(input, { isBest: max === input, isWorst: min === input })))

    log(`${indent(indentation)}${name}`)
    withBestAndWorst.forEach(benchOrSuite => presentAny(benchOrSuite, indentation + 2))
  }

  presentAny = (input, indentation) => {
    const { isBenchmark, isSuite } = input
    if (isBenchmark) {
      presentBenchmark(input, indentation)
    } else if (isSuite) {
      presentSuite(input, indentation)
    } else {
      throw new Error(`expected benchmark or suite, got ${input} instead`)
    }
  }

  return input => presentAny(input, 0)
}
