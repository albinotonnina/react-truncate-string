// import React from 'react'
import {truncateText} from '../truncateString'

describe('truncateText Unit', () => {
  it('should truncate right in the middle', () => {
    const parameters = {
      measurements: {
        text: 30,
        ellipsis: 2,
        component: 20
      },
      text: 'my string ends here',
      ellipsisString: '...'
    }

    expect(truncateText(parameters)).toEqual('my s...here')
  })

  it('should not truncate ', () => {
    const parameters = {
      measurements: {
        text: 30,
        ellipsis: 2,
        component: 40
      },
      text: 'my string ends here',
      ellipsisString: '...'
    }

    expect(truncateText(parameters)).toEqual('my string ends here')
  })
})
