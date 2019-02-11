/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Row, Col } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../components/Loading/Loading';
import DeleteOrganisationButton from './DeleteOrganisationButton';

import './AdminOrganisationComponent.scss';


class AdminOrganisationComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        organisation : {
          name: this.props.organisation && this.props.organisation.name || '',
          country: this.props.organisation && this.props.organisation.country || '',
          active: this.props.organisation && this.props.organisation.active || false,
        },
        orgActiveState: this.props.organisation.active || false,
        editing: false,
      };
  }

  switchEditing = () => {
    this.setState({
        ...this.state,
        editing: !this.state.editing,
    });
  }

  switchOrganisationState(value) {
      this.setState({
          ...this.state,
          organisation : {
              ...this.state.organisation,
              active: value,
          },
          orgActiveState : value,
      }, () => {
        this.saveOrganisation('active', this.state.orgActiveState);
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

  saveOrganisation = (stateKey, newValue) => {
    const { organisation } = this.props;
    if(organisation[stateKey] !== newValue) {
        organisation[stateKey] = newValue;

        ['createdAt', 'updatedAt', 'owner'].forEach(e => delete organisation[e]);
  
        // save chapter
        Meteor.call('organisations.update', organisation, (error) => {
            if (error) {
            Bert.alert(error.reason, 'danger');
            console.error(error);
            } else { 
            Bert.alert(organisation.name + ' saved', 'success');
            }
        });
    }
  }

  render() {
    const { loading } = this.props;
        return ( !loading ? (
        <tr>
            <td>
                {this.state.editing ? (
                    <input name="name" type="text" 
                    onBlur={(e) => this.saveOrganisation('name', e.target.value)}
                    onChange={(e) => this.updateOrganisationState('name', e)} 
                    value={this.state.organisation.name} />
                ) : (
                    <span>{this.state.organisation.name}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                <input name="country" type="text" 
                onBlur={(e) => this.saveOrganisation('billingCountry', e.target.value)}
                onChange={(e) => this.updateOrganisationState('billingCountry', e)} 
                value={this.state.organisation.billingCountry} />
                ) : (
                    <span>{this.state.organisation.billingCountry}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                    <input name="city" type="text" 
                    onBlur={(e) => this.saveOrganisation('billingCity', e.target.value)}
                    onChange={(e) => this.updateOrganisationState('billingCity', e)} 
                    value={this.state.organisation.billingCity} />
                ) : (
                    <span>{this.state.organisation.billingCity}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                    <input name="city" type="text" 
                    onBlur={(e) => this.saveOrganisation('billingAddress', e.target.value)}
                    onChange={(e) => this.updateOrganisationState('billingAddress', e)} 
                    value={this.state.organisation.billingAddress} />
                ) : (
                    <span>{this.state.organisation.billingAddress}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                    <input name="city" type="text" 
                    onBlur={(e) => this.saveOrganisation('billingPostalCode', e.target.value)}
                    onChange={(e) => this.updateOrganisationState('billingPostalCode', e)} 
                    value={this.state.organisation.billingPostalCode} />
                ) : (
                    <span>{this.state.organisation.billingPostalCode}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                    <ButtonGroup>
                        <Button color="primary" 
                        onClick={() => this.switchOrganisationState(true)} 
                        active={this.state.orgActiveState === true}>Active</Button>
                        <Button color="primary" 
                        onClick={() => this.switchOrganisationState(false)} 
                        active={this.state.orgActiveState === false}>Pause</Button>
                    </ButtonGroup>
                ) : <span>
                        {this.state.organisation.active ? 'Active' : 'Paused'}
                    </span>
                }
            </td>
            <td>
                <DeleteOrganisationButton organisationId={this.props.organisation._id}/>
            </td>
            <td>
                <Button onClick={this.switchEditing}>{this.state.editing ? 'Done' : 'Edit'}</Button>
            </td>
        </tr>
      ) : <Loading/>
    );
  }
}

AdminOrganisationComponent.defaultProps = {
  organisation : {},
};

AdminOrganisationComponent.propTypes = {
  organisation: PropTypes.object,
  loading: PropTypes.bool,
};

export default AdminOrganisationComponent;