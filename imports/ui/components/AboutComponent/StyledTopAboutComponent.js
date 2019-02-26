import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';

const StyledAboutComponent = styled.div`
    margin: 5rem 0;
    text-align: center;
`;
const StyledImageDiv = styled.div`
    opacity: ${props => props.isMobile ? "0.7" : "1"};
`;
const StyledImage = styled.img`
    max-width: 1    00%;
    height: auto;
    max-height: 300px;
`;
const StyledTitle = styled.h1` 
    margin: 5rem 0;
    color: #0e8ed5;
    text-transform: uppercase;
    letter-spacing: 3px;
`;
const StyledText = styled.p`
    letter-spacing: .8px;
    line-height: 1.5;
    font-size: 1.4rem;
    padding: 0 1.5rem 0 0;`;
    
const StyledTopAboutComponent = (props) => (
    <StyledAboutComponent isMobile={props.isMobile}>
        <StyledImageDiv isMobile={props.isMobile}>
            <StyledImage src="/img/ui/dandelion.png" alt="Flower illustration"/>
        </StyledImageDiv>    
        <Row>
            <Col xs={12} sm={{size: 10, offset:1}} xl={{size: 8, offset: 2}}>
                <StyledTitle>{i18n.__('about.title')}</StyledTitle>
                <StyledText>{i18n.__('about.description')}</StyledText>
            </Col>
        </Row>
    </StyledAboutComponent>
)


export default StyledTopAboutComponent;

StyledTopAboutComponent.propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };
