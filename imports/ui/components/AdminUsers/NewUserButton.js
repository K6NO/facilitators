/* eslint-disable max-len, no-return-assign */
import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import NewUserEditorComponent from './NewUserEditorComponent';

// import './NewUserButton.scss';

class NewUserButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        isOpen : false,
    }
  }

  openEditor = () => {
      if(!this.state.isOpen) {
          this.setState({
              isOpen: true,
          });
      }
  }

  closeEditor = () => {
      this.setState({
          isOpen: false,
      })
  }

  render() {
    const { organisations } = this.props;
    return ( 
        <div className="NewUserButton">
            <Row>
                <Col>
                    <Button color="primary" onClick={this.openEditor}>Add User</Button>
                    {this.state.isOpen ? (<Button color="danger" onClick={this.closeEditor}>Cancel</Button>) : ''}
                </Col>
            </Row>
            {this.state.isOpen ? (
                <Row>
                    <Col>
                        <NewUserEditorComponent 
                            closeCallback={this.closeEditor}
                            organisations={organisations}
                         />
                    </Col>
                </Row>
            ) : ''}
        </div>
    );
  }
}


export default NewUserButton;