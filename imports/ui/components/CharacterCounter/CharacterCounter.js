import React from 'react'
import PropTypes from 'prop-types'

// Styles
const styles = {
  counter: {
    height: 11,
    position: "relative",
    top: "-15px",
    left: "90%",
    fontSize: '12px',
    lineHeight: '11px',
    color: '#333',
  },
}

export default class CharacterCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valueLength: null,
  }
  
  }

  componentDidMount() {
    const input = this.container.firstChild;
    const inputRender = () => { this.setState({ valueLength: input.value.length }) }
    input.addEventListener('keyup', inputRender)
    inputRender()
  }

  render() {

    const { valueLength } = this.state;
    const { children, style } = this.props;
    
    const maxLength = children.props.maxLength;
    // (['text', 'email', 'password', 'textarea'].includes(children.props.type)) && children.props.maxLength ? children.props.maxLength : false
    
    return (
      <div ref={div => this.container = div}>
        {children}
        <span className='form-control-character-counter' style={style ? Object.assign({}, styles.counter, style) : styles.counter}>
          {valueLength !== null && valueLength > 0 && maxLength &&
            <span className='character-count'>{valueLength}/{maxLength}</span>
          }
        </span>
      </div>
    )
  }
}

CharacterCounter.defaultProps = {
  style: {},
}

CharacterCounter.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
}