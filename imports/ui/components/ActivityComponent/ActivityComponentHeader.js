import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Table, FormGroup } from 'reactstrap';

import './ActivityComponent.scss';

class ActivityComponentHeader extends React.Component {
    constructor(props){
      super(props);
    }

    setBackground = (color) => {
        return {
            background : color
        }
    } 
    render() {
        // const { activity } = this.props;
        // const category = activity.category;
        const category = 'deepeco';
        const color = getColorByCategory(category);
        return (
            <div className="ActivityComponentHeader"
                style={this.setBackground(color)}>
                
                <Icon icon={'back'} size={'lg'}/>Back to search results 
            </div>
        )
    }
}

ActivityComponentHeader.defaultProps = {
    
  };
  
ActivityComponentHeader.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityComponentHeader;