import React from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';
import ActivityComponentHeader from './ActivityComponentHeader';
import ActivityComponentBody from './ActivityComponentBody';
import ActivityComponentFooter from './ActivityComponentFooter';
import './ActivityComponent.scss';
import getLocale from '../../../modules/get-locale';

const StyledComponent = styled.div`
    margin-right: ${props => props.isMobile ? "1.5rem" : "0"};
    margin-left: ${props => props.isMobile ? "1.5rem" : "0"};
`;

class ActivityComponent extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { activity, backCallback, isMobile } = this.props;
        const locale = getLocale();
        return (
            <StyledComponent
                isMobile={isMobile}
            >
                <ActivityComponentHeader 
                    activity={activity}
                    locale={locale}
                    backCallback={backCallback}
                    isMobile={isMobile}
                />
                <ActivityComponentBody 
                    activity={activity}
                    locale={locale}
                    isMobile={isMobile}
                />
                <ActivityComponentFooter
                    activity={activity}
                    locale={locale}
                    isMobile={isMobile}
                />
            </StyledComponent>
        )
    }
}

ActivityComponent.defaultProps = {
    
};
  
ActivityComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    backCallback: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
};


export default ActivityComponent;
