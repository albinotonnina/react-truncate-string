import React from 'react'
import {render} from 'jest-puppeteer-react'
import TruncateString from '../truncateString'
import resizeWindow from '../../test-lib/resizeWindow'

const isCI = process.env.CI === 'true'

class Compo extends React.Component {
  state = {text: 'test fairly average string'}
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({text: 'test quite a different string'})
    }, 5000)
  }

  render() {
    console.log('render', this.state)

    return (
      <div>
        <TruncateString text={this.state.text} />
      </div>
    )
  }
}

describe('TruncateString', () => {
  jest.setTimeout(60000)

  test('should render a truncated string', async () => {
    await render(
      <TruncateString text="test long long long long longlong long long long long long long longlong long long long string" />,
      {
        viewport: {width: 200, height: 100}
      }
    )

    await page.waitFor(10)

    // const truncatedText = await page.$eval(
    //   '#main > div',
    //   node => node.innerText
    // )

    if (!isCI) {
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot()
    }

    await expect(page).toMatch('test long l...long string')
  })

  test('should not truncate the string', async () => {
    await render(<TruncateString text="test short string" />, {
      viewport: {width: 200, height: 100}
    })

    if (!isCI) {
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot()
    }

    await expect(page).toMatch('test short string')
  })

  test('should work with resize', async () => {
    await render(<TruncateString text="test short string" />, {
      viewport: {width: 200, height: 100}
    })

    await page.waitFor(10)

    await resizeWindow(100, 100)

    await page.waitFor(10)

    await expect(page).toMatch('test...ring')

    if (!isCI) {
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot()
    }
  })

  test.only('should work with update', async () => {
    // jest.useFakeTimers()

    await render(<Compo />, {
      viewport: {width: 150, height: 100}
    })
    jest.runAllTimers()
    await page.waitFor(3000)

    // const screenshot = await page.screenshot()

    // await expect(screenshot).toMatchImageSnapshot()

    await page.waitFor(30000)

    // await expect(page).toMatch('test qui...t string')

    if (!isCI) {
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot()
    }
  })
})
