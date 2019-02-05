import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, FormGroup } from 'reactstrap';
import ActivityComponentHeader from './ActivityComponentHeader';
import ActivityComponentBody from './ActivityComponentBody';
import ActivityComponentFooter from './ActivityComponentFooter';
import activity from './mockActivity.json';

import './ActivityComponent.scss';


class ActivityComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        // const { activity } = this.props;
        console.log(activity);
        return (
            <div className="ActivityComponent">
                <ActivityComponentHeader activity={activity}/>
                <ActivityComponentBody activity={activity}/>
                <ActivityComponentFooter
                    activity={activity} />
            </div>
        )
    }
}

ActivityComponent.defaultProps = {
    
};
  
ActivityComponent.propTypes = {
    activity: PropTypes.object,
};


export default ActivityComponent;
