import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, FormText, Button } from 'reactstrap';
import Icon from '../Icon/Icon';

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
            <div className="ContactComponent">
                <div>
                    <h1>{i18n.__('contact.title')}</h1>
                    <Form onSubmit={(e) => this.sendEmail(e)}>
                        <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">@</InputGroupAddon>                            
                            <Input type="email" placeholder={i18n.__('contact.email')} name="email" />
                        </InputGroup>
                        <InputGroupText>{i18n.__('contact.notification')}</InputGroupText>

                        <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">#</InputGroupAddon>                            
                            <Input type="name" placeholder={i18n.__('contact.name')} name="name" />
                        </InputGroup>
                        <FormGroup>
                            <Input type="textarea" placeholder={i18n.__('contact.message')} name="text" id="messageText" />
                        </FormGroup>
                        <Button type="submit">Send</Button>
                    </Form>
                </div>
                <div>
                    <img src="/img/ui/footprint.png" />
                </div>
            </div>
        )
    }
}


export default ContactComponent;
