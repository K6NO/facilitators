/* eslint-disable max-len, no-return-assign */
import React from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import NewOrganisationEditorComponent from '../AdminOrganisations/NewOrganisationEditorComponent';

// import './NewOrganisationButton.scss';

class NewOrganisationButton extends React.Component {
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
    return ( 
        <div className="NewOrganisationButton">
            <Row>
                <Col>
                    <Button 
                        color="primary"
                        onClick={this.openEditor}>Add Organisation
                    </Button>
                </Col>
            </Row>
            {this.state.isOpen ? (
                <Row>
                    <Col>
                        <NewOrganisationEditorComponent closeCallback={this.closeEditor} />
                    </Col>
                </Row>
            ) : ''}
        </div>
    );
  }
}


export default NewOrganisationButton;