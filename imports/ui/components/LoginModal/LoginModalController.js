import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import LoginModal from './LoginModal';
import { Button } from 'reactstrap';
import './LoginModalController.scss';

class LoginModalController extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            which: 'login',
        }

    }
    componentWillMount () {
        Modal.setAppElement('#react-root');
    }
    closeModal = () => {
        this.setState({isOpen: false});
    }
    openModal = () => {
        const { navbarCallback } =this.props;
        this.setState({isOpen: true});
        // toggle navigation open/close state in mobile view
        navbarCallback();
    }

    getParent = () => {
        return document.querySelector('#view-active-game') || document.querySelector('#react-root') ;
    }

    render() {
        const { isOpen } = this.state;
        const { className, viewportIsMobile } = this.props;

        return (
            <div className={`${className} LoginModalController`}
                onSubmit={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
            >
                <Button 
                    onClick={this.openModal}>
                    Sign Up | Login
                </Button>
                
                <Modal
                    onRequestClose={this.closeModal}
                    isOpen={isOpen}
                    className="Login Modal"
                    overlayClassName="Login Overlay"
                    parentSelector={this.getParent}
                >
                    <LoginModal closeCallback={this.closeModal}/>
                </Modal>
            </div>
        );
    }
}

LoginModalController.defaultProps = {
    history: '',
  };
  
  LoginModalController.propTypes = {
    history: PropTypes.object.isRequired,
  };

export default withRouter(LoginModalController);
