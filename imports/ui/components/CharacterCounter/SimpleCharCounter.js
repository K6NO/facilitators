import React, {Component } from 'react';
import PropTypes from 'prop-types';
 
class SimpleCharCounter extends Component {
  constructor(props) {
      super(props);
        this.state = {
            count: this.getCount(this.props.startValue)
        }
  }
  
 
  
  componentWillReceiveProps(nextProps) {
      if(this.props.startValue !== nextProps.startValue) {
          this.setState({
              count: this.getCount(nextProps.startValue)
          });
      }
  }

  getCount = (fieldValue) => {
    let cont = fieldValue.replace(/<[^>]*>/g," ");
    cont = cont.replace(/\s+/g, ' ');
    return cont.trim().length;
  }
 
  render () {
    return (
        <span className="counter">{this.state.count} / {this.props.maxValue}</span>
    );
  }
}

SimpleCharCounter.propTypes = {
    startValue: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
}
export default SimpleCharCounter;