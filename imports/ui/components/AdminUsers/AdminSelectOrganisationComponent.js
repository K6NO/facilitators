import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';

// import './AdminSelectOrganisationComponent.scss';

class AdminSelectOrganisationComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOrgId: this.props.selectOrganisation,
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectOrganisation !== this.props.selectOrganisation) {
            this.setState({
                selectedOrgId : nextProps.selectOrganisation
            });
        }
    }
    
    handleChange = (selection) => {
        let { selectOrganisationCallback } = this.props;
        this.setState({
            selectedOrgId: selection ? selection._id : '',
        });
        selectOrganisationCallback(selection);
    };

    render() {
        const { organisations, editing, organisationId, user } = this.props;
        const org = organisationId && organisationId.length > 5 
            && organisations.find(org => org._id === organisationId);
        const orgName = org ? org.name : '';

        return (
            editing ? (
                !!Roles.userIsInRole(user._id, ['superadmin']) ? 'Cannot change' :
                <ReactSelect 
                    className="AdminSelectOrganisationComponent"
                    labelKey="name"
                    valueKey="_id"
                    options={organisations}
                    value={this.state.selectedOrgId}
                    resetValue=""
                    name="organisationsSelect"
                    onChange={this.handleChange}/>
            ) : 
                <span>
                    {orgName}
                </span> 
            
        )
    }
}

AdminSelectOrganisationComponent.defaultProps = {
    organisationId: '',
};

AdminSelectOrganisationComponent.propTypes = {
    user: PropTypes.object.isRequired,
    organisations: PropTypes.arrayOf(PropTypes.object).isRequired,
    editing: PropTypes.bool.isRequired,
    organisationId: PropTypes.string
};
  
export default AdminSelectOrganisationComponent;