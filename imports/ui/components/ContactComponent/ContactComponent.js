import React from 'react';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';
import { Row, Col } from 'reactstrap';

const StyledContactComponent = styled.div`
    margin: 5rem 0;
    padding: 5rem 0;
`;
const StyledImageDiv = styled.div`
    position: absolute;
    top: ${props => props.isMobile ? "20rem" : "15rem"};
    left: ${props => props.isMobile ? "0px" : "40rem"};
    opacity: ${props => props.isMobile ? "0.7" : "1"};
`;
const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 480px;
    z-index: 0;
`;
const StyledTitle = styled.h1`
    color: #263810;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 2rem;
`;
const StyledForm = styled.form`
    text-align: right;
`;
const StyledInput = styled.input`
    background: #ffffffaa;
    border: 1px solid #cccccc;
    width: 100%;
    font-family: Open, sans-serif;
    font-size: 1.3rem;
    color: #999999;
    padding: .5rem 1rem;
    margin-top: 1rem;
`
const StyledButton = styled.button`
    height: 40px;
    min-width: 110px;
    padding: .8rem 1.5rem!important;
    background: #0e8ed5!important;
    color: white;
    text-transform: uppercase;
    font-size: 1.6rem!important;
    letter-spacing: 1.5px;
    font-weight: 100!important;
    margin-top: 1rem;
    &:hover {
        background: #0e8ed5bb!important;
    }
    &:focus {
        outline: 1px dotted;
        background: #0e8ed5dd!important;
    }
`

const StyledTextArea = styled(StyledInput)`
    background: #ffffffaa;
    border: 1px solid #cccccc;
    font-family: Open, sans-serif;
    font-size: 1.3rem;
    color: #999999;
    padding: .5rem 1rem;
    height: 200px;
`;

const StyledNotification = styled.span`
    font-size: 1rem;
`;

class ContactComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    sendEmail = (e) => {
        console.log('clicks')
        e.preventDefault();
        console.log(e.target.email.value, e.target.name.value, e.target.text.value)

    }
    render() {
        return (
            <StyledContactComponent>
                <Row>
                    <Col xs={{size: 12}} sm={{size: 8, offset: 2}} style={{zIndex : "1"}}>
                        <StyledTitle>{i18n.__('contact.title')}</StyledTitle>
                        <StyledForm onSubmit={(e) => this.sendEmail(e)}>
                        <StyledInput type="email" placeholder={i18n.__('contact.email')} name="email" />
                            <StyledNotification>{i18n.__('contact.notification')}</StyledNotification>
                            <StyledInput type="name" placeholder={i18n.__('contact.name')} name="name" />
                            <StyledTextArea type="textarea" placeholder={i18n.__('contact.message')} name="text" id="messageText" />
                            <StyledButton type="submit">Send</StyledButton>
                        </StyledForm>
                    </Col>
                </Row>
                <StyledImageDiv isMobile={this.props.isMobile}>
                    <StyledImage src="/img/ui/footprint.png" />
                </StyledImageDiv>
            </StyledContactComponent>
        )
    }
}


export default ContactComponent;
