import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

// import LoginModalContainer from '../LoginModal/LoginModalController2';

class ModalContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
      this.closeModal = this.closeModal.bind(this);
      this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('#react-root');
    }

    closeModal() {
        this.setState({isOpen: false});
    }

    openModal() {
        this.setState({isOpen: true});
    }

    render() {
        const { children } = this.props;
        return (
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.closeModal}
            >
                {/* <Button onClick={this.closeModal}>Close Modal</Button> */}
                {children}
            </Modal>

        );
    }
}

ModalContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ModalContainer;
