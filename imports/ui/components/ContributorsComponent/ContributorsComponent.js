import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';
import ContributorsCard from './ContributorsCard';
import { getContributors } from '../../../modules/get-select-translations';


const StyledTitle = styled.h1`
    color: #0e8ed5;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 5rem;
`;


    
class ContributorsComponent extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { isMobile } = this.props;
        
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <StyledTitle>{i18n.__('about.contributors')}</StyledTitle>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {getContributors().map(c => 
                        <ContributorsCard key={c.name} c={c} isMobile={isMobile} />
                    )}
                </Row>
            </div>
        )
    }
}


export default ContributorsComponent;

ContributorsComponent.propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };
