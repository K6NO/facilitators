import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, FormGroup } from 'reactstrap';
import ActivityComponentHeader from './ActivityComponentHeader';
import ActivityComponentBody from './ActivityComponentBody';
import ActivityComponentFooter from './ActivityComponentFooter';

import './ActivityComponent.scss';


class ActivityComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        const { activity } = this.props;
        return (
            <div className="ActivityComponent">
                <ActivityComponentHeader />
                <ActivityComponentBody />
                <ActivityComponentFooter
                    activity={activity} />
            </div>
        )
    }
}

ActivityComponent.defaultProps = {
    
  };
  
ActivityComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityComponent;
