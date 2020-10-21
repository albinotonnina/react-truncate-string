// import React from 'react'
import {truncateString} from '../truncateString'

describe('truncateText Unit', () => {
  it('should truncate right in the middle', () => {
    const parameters = {
      measurements: {
        text: 30,
        ellipsis: 2,
        component: 20
      },
      text: 'my string ends here',
      ellipsisString: '\u2026'
    }

    expect(truncateString(parameters)).toEqual('my st\u2026 here')
  })

  it('should not truncate ', () => {
    const parameters = {
      measurements: {
        text: 30,
        ellipsis: 2,
        component: 40
      },
      text: 'my string ends here',
      ellipsisString: '\u2026'
    }

    expect(truncateString(parameters)).toEqual('my string ends here')
  })
})
