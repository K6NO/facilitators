import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Table, FormGroup } from 'reactstrap';

import './ActivityComponent.scss';

class ActivityComponentFooter extends React.Component {
    constructor(props){
      super(props);
    }

    setBackground = (color) => {
        return {
            background : color
        }
    } 
    render() {
        const { activity } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <div className="ActivityComponentFooter"
                style={this.setBackground(color)}>
                
                <Icon icon={'back'} size={'lg'}/>Back to search results 
            </div>
        )
    }
}

ActivityComponentFooter.defaultProps = {
    
  };
  
  ActivityComponentFooter.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityComponentFooter;