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
      ellipsisString: '...'
    }

    expect(truncateString(parameters)).toEqual('my ...ere')
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

    expect(truncateString(parameters)).toEqual('my string ends here')
  })
})
