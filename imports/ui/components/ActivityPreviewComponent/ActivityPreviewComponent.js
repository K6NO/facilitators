import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ActivityPreviewComponentHeader from './ActivityPreviewComponentHeader';
import ActivityPreviewComponentBody from './ActivityPreviewComponentBody';

const StyledPreviewComponent = styled.div`
    padding: .5rem 1rem;
    box-shadow: 1px 1px 1px 1px #ededed;
    &:hover {
        background: #efefefaa;
        box-shadow: 1px 1px 1px 1px #ccc;
    }
`;



class ActivityPreviewComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        const { activity, selectActivityCallback } = this.props;
        return (
            <StyledPreviewComponent>
                <ActivityPreviewComponentHeader 
                    activity={activity}
                />
                <ActivityPreviewComponentBody 
                    activity={activity}
                    selectActivityCallback={selectActivityCallback}
                />
            </StyledPreviewComponent>
        )
    }
}
  
ActivityPreviewComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityPreviewComponent;
