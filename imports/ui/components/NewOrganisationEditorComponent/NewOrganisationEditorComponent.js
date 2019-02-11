/* eslint-disable max-len, no-return-assign */
import React from 'react';
import { Table, Button, ButtonGroup, Row, Col } from 'reactstrap';
import { Bert } from 'meteor/themeteorchef:bert';

class NewOrganisationEditorComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        organisation : {
            name: '',
            country: '',
            active: false,
          },
          orgActiveState: false,
    }
  }

  switchOrganisationState(value) {
    this.setState({
        ...this.state,
        orgActiveState : value,
    }); 
  }

  updateOrganisationState = (field, event) => {
    this.setState({
      organisation : {
        ...this.state.organisation,
        [field]: event.target.value,
      }
    });
  }

  saveNewOrganisation = () => {
      const { closeCallback } = this.props;
      const organisation = {
          name: this.state.organisation.name,
          country: this.state.organisation.country,
          active: this.state.organisation.active,
      }
      Meteor.call('organisations.insert', organisation, (error) => {
          if(error) {
              Bert.alert(error.reason, 'danger');
          } else {
              //reset the state
              this.setState({
                organisation : {
                    name: '',
                    country: '',
                    active: false,
                  },
              });
              closeCallback();
          }
      });
  }

  render() {
    const { closeCallback } = this.props;
    return ( 
        <div className="NewOrganisationEditorComponent">
            <Row>
                <Col>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input name="name" type="text" 
                                    onChange={(e) => this.updateOrganisationState('name', e)} 
                                    value={this.state.organisation.name} />
                                </td>
                                <td>
                                    <input name="country" type="text"                                         
                                    onChange={(e) => this.updateOrganisationState('country', e)} 
                                    value={this.state.organisation.country} />
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button color="primary" 
                                            onClick={() => this.switchOrganisationState(true)} 
                                            active={this.state.orgActiveState === true}>Active</Button>
                                        <Button color="primary" 
                                            onClick={() => this.switchOrganisationState(false)} 
                                            active={this.state.orgActiveState === false}>Inactive</Button>
                                    </ButtonGroup>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.saveNewOrganisation()}>Save</Button>
                                        <Button color="danger" onClick={closeCallback}>Cancel</Button>
                                    </ButtonGroup>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
  }
}


export default NewOrganisationEditorComponent;