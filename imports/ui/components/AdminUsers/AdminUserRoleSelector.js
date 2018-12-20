/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Row, Col } from 'reactstrap';
import { Meteor } from 'meteor/meteor';

class AdminUserRoleSelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        cSelected: this.props.user.roles || [],
      }
    }

    onCheckboxBtnClick = (e) => {
        const selected = e.target.value;
        const index = this.state.cSelected.indexOf(selected);
        const { switchUserRolesCallback } = this.props;
        if (index < 0) {
          this.state.cSelected.push(selected);
        } else {
          this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] }, () => {
            switchUserRolesCallback(this.state.cSelected);
        });
        
      }
    render() {
        const { editing } = this.props;
        return(
            editing ? (
                !!Roles.userIsInRole(this.props.user, ['superadmin']) ? 'Cannot change' :
                    <ButtonGroup
                    name="roleSelectButtons"
                    defaultValue={this.props.user.roles}>
                        <Button value="user" 
                            onClick={(e) => {this.onCheckboxBtnClick(e)}}
                            active={this.state.cSelected.includes('user')}>
                            User</Button>
                        <Button value="editor" 
                            onClick={(e) => {this.onCheckboxBtnClick(e)}}
                            active={this.state.cSelected.includes('editor')}>
                        Editor</Button>
                        <Button value="admin" 
                            onClick={(e) => {this.onCheckboxBtnClick(e)}}
                            active={this.state.cSelected.includes('admin')}>
                        Admin</Button>
                    </ButtonGroup>
            ) : (
                <span>
                    {this.state.cSelected.reduce((result, role) => result + role + ', ' , [])}
                </span>
            )
        )
    }
}

AdminUserRoleSelector.defaultProps = {
    user : {},
    editing: false,
  };
  
  AdminUserRoleSelector.propTypes = {
    user: PropTypes.object,
    editing: PropTypes.bool,
  };

  export default AdminUserRoleSelector;