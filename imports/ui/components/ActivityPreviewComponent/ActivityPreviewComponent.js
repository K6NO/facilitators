import React from 'react';
import PropTypes from 'prop-types';
import ActivityPreviewComponentHeader from './ActivityPreviewComponentHeader';
import ActivityPreviewComponentBody from './ActivityPreviewComponentBody';

class ActivityPreviewComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        const { activity, selectActivityCallback } = this.props;
        return (
            <div className="ActivityPreviewComponent">
                <ActivityPreviewComponentHeader 
                    activity={activity}
                />
                <ActivityPreviewComponentBody 
                    activity={activity}
                    selectActivityCallback={selectActivityCallback}
                />
            </div>
        )
    }
}
  
ActivityPreviewComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityPreviewComponent;
