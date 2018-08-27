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
    truncating: true,
    truncatedText: null
  }

  setTruncateString(text) {
    const measurements = {
      component: this.componentRef.offsetWidth,
      ellipsis: this.ellipsisRef.offsetWidth,
      text: this.textRef.offsetWidth
    }

    const {ellipsisString} = this.props

    const truncatedText = truncateText({measurements, text, ellipsisString})

    this.setState({truncatedText, truncating: false})
  }

  resetTruncate = debounce(50, () => {
    // this renders the original string so we can measure it
    this.setState({truncating: true}, () =>
      this.setTruncateString(this.props.text)
    )
  })

  componentDidMount() {
    this.setTruncateString(this.props.text)
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
    const {text, ellipsisString, style, ...otherProps} = this.props
    const {truncatedText, truncating} = this.state

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
        {!truncating && truncatedText}
      </div>
    )
  }
}

export default TruncateString
