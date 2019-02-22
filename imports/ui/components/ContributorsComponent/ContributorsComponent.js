import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';
import ContributorsCard from './ContributorsCard';

const StyledContributorsComponent = styled(Row)`
    margin-top: ${props => props.isMobile ? "5rem" : "5rem"};
    margin-bottom: ${props => props.isMobile ? "5rem" : "5rem"};
`;

const StyledTitle = styled.h1`
    color: #0e8ed5;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: left;
    padding: 3rem 0;
`;


    
class ContributorsComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        const { isMobile } = this.props;
        const contributors = [{name: 'FirstN LastN', organisation: 'Organisation', text: 'Some introduction, max 100 characters, not more. Otherwise no one will read about the team.', url: 'http://lorempixel.com/output/people-q-c-119-84-1.jpg'},
        {name: 'SecFirstN SecLastN', text: 'Some introduction, max 100 characters, not more. Otherwise no one will read about the team.', url: 'http://lorempixel.com/output/people-q-c-119-84-5.jpg'} ]
        return (
            <StyledContributorsComponent isMobile={isMobile}>
                 <Col xs={12}>
                    <StyledTitle>{i18n.__('about.contributors')}</StyledTitle>
                </Col>
                <Col xs={12}>
                {contributors.map(c => 
                    <ContributorsCard key={c.name} c={c} isMobile={isMobile} />
                )}
                </Col>
            </StyledContributorsComponent>
            
        )
    }
}


export default ContributorsComponent;

ContributorsComponent.propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };
