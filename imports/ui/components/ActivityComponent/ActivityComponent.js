import React from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';
import ActivityComponentHeader from './ActivityComponentHeader';
import ActivityComponentBody from './ActivityComponentBody';
import ActivityComponentFooter from './ActivityComponentFooter';
import { BasicStyledLink } from '../MainStyledComponents/MainStyledComponents';
import Icon from '../../components/Icon/Icon';
import ReactToPrint from 'react-to-print';
import './ActivityComponent.scss';
import getLocale from '../../../modules/get-locale';

const StyledComponent = styled.div`
    margin-right: ${props => props.isMobile ? "1.5rem" : "0"};
    margin-left: ${props => props.isMobile ? "1.5rem" : "0"};
`;
class ActivityToPrint extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const { ...props } = this.props;
        return (
            <StyledComponent
                {...props}
            >
                <ActivityComponentHeader 
                    {...props}
                    locale={props.locale}
                />
                <ActivityComponentBody 
                    {...props}
                    locale={props.locale}

                />
                <ActivityComponentFooter
                    {...props}
                    locale={props.locale}
                />
            </StyledComponent>
        )
    } 
}
class ActivityComponent extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { ...props } = this.props;
        const locale = getLocale();
        return (
            <div>
                <ReactToPrint
                trigger ={() => <BasicStyledLink 
                        href="#"
                        backcolor={'#ffffff'}
                        color={'#0e8ed5'}>
                        <Icon icon={'print'} />{` Print`}
                    </BasicStyledLink>}
                content={() => this.componentRef}
                bodyClass="printActivity" />
                <ActivityToPrint 
                    ref={el => (this.componentRef = el)}
                    {...props} 
                    locale={locale}/>
            </div>
            
        )
    }
}

ActivityComponent.defaultProps = {
    
};
  
ActivityComponent.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string,
    activity: PropTypes.object.isRequired,
    backCallback: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
};


export default ActivityComponent;
