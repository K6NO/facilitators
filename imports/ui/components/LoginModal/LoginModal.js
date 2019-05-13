import React from 'react';
import PropTypes from 'prop-types';
import SignupComponent from './SignupComponent';
import LoginComponent from './LoginComponent';
import { Button, Row, Col } from 'reactstrap';
import { StyledImage } from './StyledComponents'

import './LoginModal.scss';



class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            which: 'signup',
        }
    }

    switchToLoginCallback = () => {
        this.setState({
            which: 'login',
        });
    }
    switchToSignupCallback = () => {
        this.setState({
            which: 'signup',
        });
    }
    
    render(){
        
        return (
            <div className="LoginModal">
                <Row>   
                    <Col className="closeButtonHolder" xs="12">
                        <Button className="CloseButton" onClick={this.props.closeCallback}>
                            <img className="crossImage" src="/img/ui/icon_cross_dark.svg" alt="closeIcon"/>
                        </Button>
                    </Col>
                    <Col xs="12 text-left">
                        <StyledImage src="/img/ui/logo@0.15x.png"/>
                    </Col>
                </Row>
                {this.state.which === 'login' &&
                <Row>
                    <Col className="switchButtonHolder" xs="12">
                        <LoginComponent />
                        <Button className="SwitchButton" onClick={this.switchToSignupCallback}>
                            No account? Sign Up Here
                        </Button>
                    </Col>
                </Row>
                }
                {this.state.which === 'signup' &&
                <Row>
                    <Col className="switchButtonHolder" xs="12">
                        <SignupComponent history={history}/>
                        <Button className="SwitchButton" onClick={this.switchToLoginCallback}>
                            Have an account? Login Here
                        </Button>
                    </Col>
                </Row>
                }
            </div>
       ); 
    }
}

LoginModal.defaultProps = {
    closeCallback: (error) => {
      if (error) Bert.alert(error.message, 'danger');
    },
  };
  
  LoginModal.propTypes = {
    closeCallback: PropTypes.func,
  };

export default LoginModal;