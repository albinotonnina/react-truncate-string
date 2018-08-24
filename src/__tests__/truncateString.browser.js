import React from 'react'
import {render} from 'jest-puppeteer-react'
import TruncateString from '../truncateString'
const isCI = process.env.CI === 'true'
describe('TruncateString', () => {
  jest.setTimeout(10000)

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
})
