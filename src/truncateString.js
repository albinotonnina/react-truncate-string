import React, {PureComponent} from 'react'
import {debounce} from 'throttle-debounce'
import PropTypes from 'prop-types'

export const truncateText = ({text, ellipsisString, measurements}) => {
  if (measurements.text > measurements.component) {
    const half = measurements.component / 2 - measurements.ellipsis * 2
    const portion = Math.ceil((text.length * half) / measurements.text)
    const left = text.slice(0, portion)
    const right = text.slice(text.length - portion, text.length)

    return `${left}${ellipsisString}${right}`
  } else {
    return text
  }
}

class TruncateString extends PureComponent {
  static propTypes = {
    ellipsisString: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    ellipsisString: '...',
    text: ''
  }

  state = {
    truncatedText: null
  }

  parseTextForTruncation(text) {
    const measurements = {
      component: this.componentRef.offsetWidth,
      ellipsis: this.ellipsisRef.offsetWidth,
      text: this.textRef.offsetWidth
    }

    const {ellipsisString} = this.props

    const truncatedText = truncateText({measurements, text, ellipsisString})

    this.setState({truncatedText})
  }

  resetTruncate = debounce(50, () => {
    this.setState({truncatedText: false})
    this.parseTextForTruncation(this.props.text)
  })

  componentDidMount() {
    this.parseTextForTruncation(this.props.text)
    window.addEventListener('resize', this.resetTruncate)
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
    const {text, ellipsisString, style, ...otherProps} = this.props
    const {truncatedText} = this.state

    const componentStyle = {
      ...style,
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }

    return (
      <div ref={this.setComponentRef} style={componentStyle} {...otherProps}>
        {!truncatedText && <span ref={this.setTextRef}>{text}</span>}
        {!truncatedText && (
          <span ref={this.setEllipsisRef}>{ellipsisString}</span>
        )}
        {truncatedText}
      </div>
    )
  }
}

export default TruncateString
