import React from 'react';
import styled from 'styled-components';
import i18n from 'meteor/universe:i18n';
import { Row, Col } from 'reactstrap';
import Icon from '../Icon/Icon';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';

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
const StyledContactButton = styled(BasicStyledButton)`
    text-transform: uppercase;
    min-width: 110px;
    font-size: 1.6rem;
    letter-spacing: 4px;
    margin-top: 1rem;
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
                            <StyledContactButton
                                backcolor={'#263810'}
                                color={'white'}
                                type="submit">
                                <Icon icon={'paper-plane'} /> Send</StyledContactButton>
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
