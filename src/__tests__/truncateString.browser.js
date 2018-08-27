import React from 'react'
import {render} from 'jest-puppeteer-react'
import TruncateString from '../truncateString'
import resizeWindow from '../../test-lib/resizeWindow'

const isCI = process.env.CI === 'true'

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

  test('should work with update', async () => {
    class CompoThatChangesProps extends React.Component {
      state = {text: 'test fairly average string'}
      componentDidMount = () => {
        setTimeout(() => {
          this.setState({text: 'test quite a different string'})
        }, 100)
      }

      render() {
        return <TruncateString text={this.state.text} />
      }
    }

    await render(<CompoThatChangesProps />, {
      viewport: {width: 150, height: 100}
    })

    await page.waitFor(200)

    await expect(page).toMatch('test qui...t string')

    if (!isCI) {
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot()
    }
  })
})
