import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import _ from 'lodash';
import ReactResponsiveSelect from 'react-responsive-select';
import './MultiSelector.scss';

const caretIcon = (
    <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
      <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
    </svg>
  );

class MultiSelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selectedValues: [],
      }
    }
  
    handleChange = (newValue) => {
      const { updateSearchCallback, name } = this.props;
      const selected = newValue.options.map(v => v.value).filter(v => v !== 'null');

      // Without this check the component repeatedly updates
      const shouldUpdate = !_.isEqual(this.state.selectedValues, selected);

      if(shouldUpdate) {
        this.setState({
          ...this.state,
          selectedValues: selected,
        }, () => updateSearchCallback(name, this.state.selectedValues));
      }
    }

    customLabelRenderer = (multiOptions) => {
      return multiOptions.options.map(option => <Badge key={option.value} color="light" pill>{option.text}</Badge>);
    }
  

    render () {
        const { options, name, className, noSelectionLabel, ariaLabel, custom} = this.props;
        return (
            <ReactResponsiveSelect
                multiselect
                name={name}
                options={options}
                onChange={this.handleChange}
                selectedValues={this.state.selectedValues}
                noSelectionLabel={noSelectionLabel}
                customLabelRenderer={custom ? multiSelectSelectedOptions => this.customLabelRenderer(multiSelectSelectedOptions) : ''}
                caretIcon={caretIcon}
                className={className}
                aria-label={ariaLabel}
            />
        )
    }
}
  

MultiSelector.propTypes = {
  updateSearchCallback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  noSelectionLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};
  
export default MultiSelector;
  