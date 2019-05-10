import React, {Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import SimpleCharCounter from '../CharacterCounter/SimpleCharCounter';

class EditorRTE extends Component {
  
  state = {
    value: RichTextEditor.createValueFromString(this.props.startValue, 'html')
  }
 
  onChange = (value) => {
    this.setState({value});
  };
 
  render () {
    return (
      <div>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
          onBlur={() => this.props.saveCallback(this.state.value.toString('html'))}
        />
        <SimpleCharCounter 
            startValue={this.state.value.toString('html')}
            maxValue={this.props.maxValue}
        />
      </div>
    );
  }
}

EditorRTE.propTypes = {
    saveCallback : PropTypes.func.isRequired,
    startValue: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
}
export default EditorRTE;