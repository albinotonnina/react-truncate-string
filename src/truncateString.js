import React, {PureComponent} from 'react'
import {debounce} from 'throttle-debounce'
import PropTypes from 'prop-types'

export const truncateString = ({
  text,
  ellipsisString,
  measurements,
  leftPercentage = 50
}) => {
  if (measurements.text > measurements.component) {
    const size = percentage => measurements.component * (percentage / 100)

    const portion = size => Math.floor((text.length * size) / measurements.text)

    const left = text.slice(
      0,
      Math.max(0, portion(size(leftPercentage)) - ellipsisString.length)
    )

    const right = text.slice(
      text.length - portion(size(100 - leftPercentage)) + ellipsisString.length,
      text.length
    )

    return `${left}${ellipsisString}${right}`
  } else {
    return text
  }
}

class TruncateString extends PureComponent {
  static propTypes = {
    ellipsisString: PropTypes.string,
    truncateAt: PropTypes.number,
    text: PropTypes.string
  }

  static defaultProps = {
    ellipsisString: '...',
    text: '',
    truncateAt: 50
  }

  state = {
    truncating: true,
    truncatedString: null
  }

  getTruncateString(text) {
    const measurements = {
      component: this.componentRef.offsetWidth,
      ellipsis: this.ellipsisRef.offsetWidth,
      text: this.textRef.offsetWidth
    }

    const {ellipsisString} = this.props

    return truncateString({
      measurements,
      text,
      ellipsisString,
      leftPercentage: this.props.truncateAt
    })
  }

  resetTruncate = debounce(50, () => {
    // this renders the original string so we can measure it
    this.setState({truncating: true}, () => {
      // now we render again with the truncated string
      const truncatedString = this.getTruncateString(this.props.text)
      this.setState({truncatedString, truncating: false})
    })
  })

  componentDidMount() {
    // calculate  truncatedString and set state to render again with the truncated string
    const truncatedString = this.getTruncateString(this.props.text)
    this.setState({truncatedString, truncating: false})

    window.addEventListener('resize', this.resetTruncate)
  }

  componentDidUpdate = (_, prevState) => {
    /*
    Yes, we are using an anti-pattern here. 
    We want to render two times:
      one to display and measure the input string 
      one to display the truncated
    */
    this.state.truncating === prevState.truncating && this.resetTruncate()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetTruncate)
  }

  setComponentRef = element => {
    this.componentRef = element
  }

  setTextRef = element => {
    this.textRef = element
  }

  setEllipsisRef = element => {
    this.ellipsisRef = element
  }

  render() {
    const {text, ellipsisString, truncateAt, style, ...otherProps} = this.props
    const {truncatedString, truncating} = this.state

    const componentStyle = {
      ...style,
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }

    return (
      <div ref={this.setComponentRef} style={componentStyle} {...otherProps}>
        {truncating && <span ref={this.setTextRef}>{text}</span>}
        {truncating && <span ref={this.setEllipsisRef}>{ellipsisString}</span>}
        {!truncating && truncatedString}
      </div>
    )
  }
}

export default TruncateString
