import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';
import ContributorsCard from './ContributorsCard';
import { getContributors } from '../../../modules/get-select-translations';

const StyledContributorsComponent = styled(Row)`
    margin-top: 5rem;
    margin-bottom: 5rem;
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
        
        return (
            <StyledContributorsComponent>
                 <Col xs={12}>
                    <StyledTitle>{i18n.__('about.contributors')}</StyledTitle>
                </Col>
                <Col xs={12}>
                {getContributors().map(c => 
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
