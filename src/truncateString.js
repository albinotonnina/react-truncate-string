import React, {PureComponent} from 'react'
import {debounce} from 'throttle-debounce'
import PropTypes from 'prop-types'

class TruncateString extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    ellipsis: '...',
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

    const truncatedText =
      measurements.text > measurements.component
        ? this.truncateTextCenter(measurements)
        : text

    this.setState({truncatedText})
  }

  truncateTextCenter(measurements) {
    const {text, ellipsis} = this.props

    const half = measurements.component / 2 - measurements.ellipsis * 2
    const portion = Math.ceil((text.length * half) / measurements.text)
    const left = text.slice(0, portion)
    const right = text.slice(text.length - portion, text.length)

    return `${left}${ellipsis}${right}`
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
    const {text, ellipsis, style, ...otherProps} = this.props
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
        {!truncatedText && <span ref={this.setEllipsisRef}>{ellipsis}</span>}
        {truncatedText}
      </div>
    )
  }
}

export default TruncateString
