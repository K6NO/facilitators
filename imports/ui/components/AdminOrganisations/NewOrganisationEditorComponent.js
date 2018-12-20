/* eslint-disable max-len, no-return-assign */
import React from 'react';
import { Table, Button, ButtonGroup, Row, Col } from 'reactstrap';
import { Bert } from 'meteor/themeteorchef:bert';
// import './NewOrganisationEditorComponent.scss';

class NewOrganisationEditorComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        organisation : {
            name: '',
            billingAddress: '',
            billingCity: '',
            billingPostalCode: '',
            billingCountry: '',
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
          billingAddress: this.state.organisation.billingAddress,
          billingCity: this.state.organisation.billingCity,
          billingPostalCode: this.state.organisation.billingPostalCode,
          billingCountry: this.state.organisation.billingCountry,
          active: this.state.organisation.active,
      }
      Meteor.call('organisations.insert', organisation, (error) => {
          if(error) {
              Bert.alert(error.reason, 'danger');
          } else {
              this.setState({
                organisation : {
                    name: '',
                    billingAddress: '',
                    billingCity: '',
                    billingPostalCode: '',
                    billingCountry: '',
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
                            <th>City</th>
                            <th>Address</th>
                            <th>Postal code</th>
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
                                    onChange={(e) => this.updateOrganisationState('billingCountry', e)} 
                                    value={this.state.organisation.billingCountry} />
                                </td>
                                <td>
                                    <input name="city" type="text" 
                                        onChange={(e) => this.updateOrganisationState('billingCity', e)} 
                                        value={this.state.organisation.billingCity} />
                                </td>
                                <td>
                                    <input name="city" type="text"                                         
                                        onChange={(e) => this.updateOrganisationState('billingAddress', e)} 
                                        value={this.state.organisation.billingAddress} />
                                </td>
                                <td>
                                    <input name="city" type="text" 
                                        onChange={(e) => this.updateOrganisationState('billingPostalCode', e)} 
                                        value={this.state.organisation.billingPostalCode} />
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button color="primary" 
                                            onClick={() => this.switchOrganisationState(true)} 
                                            active={this.state.orgActiveState === true}>Active</Button>
                                        <Button color="primary" 
                                            onClick={() => this.switchOrganisationState(false)} 
                                            active={this.state.orgActiveState === false}>Paused</Button>
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