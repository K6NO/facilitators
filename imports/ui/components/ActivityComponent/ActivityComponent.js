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
        const { ...props } = this.props;
        const locale = getLocale();
        return (
            <StyledComponent
                {...props}
            >
                <ActivityComponentHeader 
                    {...props}
                    locale={locale}
                />
                <ActivityComponentBody 
                    {...props}
                    locale={locale}

                />
                <ActivityComponentFooter
                    {...props}
                    locale={locale}
                />
            </StyledComponent>
        )
    }
}

ActivityComponent.defaultProps = {
    
};
  
ActivityComponent.propTypes = {
    userId: PropTypes.string,
    activity: PropTypes.object.isRequired,
    backCallback: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
};


export default ActivityComponent;
