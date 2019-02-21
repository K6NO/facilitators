import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';

const StyledAboutComponent = styled.div`
    margin: 15rem 0;
`;
const StyledImageDiv = styled.div`
    position: absolute;
    top: ${props => props.isMobile ? "0px" : "50px"};
    left: ${props => props.isMobile ? "200px" : "-150px"};
    opacity: ${props => props.isMobile ? "0.7" : "1"};
`;
const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 480px;
    `;
const StyledTitle = styled.h1`
    color: #0e8ed5;
    text-transform: uppercase;
    letter-spacing: 3px;
`;
const StyledText = styled.p`
    letter-spacing: .8px;
    line-height: 1.5;
    font-size: 1.4rem;
    padding: 1.5rem 3.5rem 0 0;`;
class AboutComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        return (
            <StyledAboutComponent className="AboutComponent">
                <StyledImageDiv isMobile={this.props.isMobile}>
                    <StyledImage src="/img/ui/dandelion.png" />
                </StyledImageDiv>    
                <Row>
                    <Col xs={12} sm={{size: 10, offset:2}}>
                        <StyledTitle>{i18n.__('about.title')}</StyledTitle>
                        <StyledText>{i18n.__('about.description')}</StyledText>
                    </Col>
                </Row>
            </StyledAboutComponent>
        )
    }
}


export default AboutComponent;

AboutComponent.propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };
