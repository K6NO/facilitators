import React from 'react';
import PropTypes from 'prop-types';
import './AdminSelectOrganisationComponent.scss';

class AdminSelectOrganisationComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: this.props.selectedOrganisation
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedOrganisation !== this.props.selectedOrganisation) {
            this.setState({
                selected : nextProps.selectedOrganisation
            });
        }
    }
    
    handleChange = (selection) => {
        const { selectOrganisationCallback } = this.props;
        this.setState({
            selected: selection.target.value,
        });
        selectOrganisationCallback(selection.target.value);
    };


    render() {
        const { organisations, editing, selectedOrganisation, user } = this.props;
        const orgName = selectedOrganisation 
            ? organisations.find(org => org._id === selectedOrganisation).name
            : 'No Organisation';

        return (
            editing ? (
                <select 
                    onChange={this.handleChange}
                    className="AdminSelectOrganisationComponent">
                    {organisations.map(org => 
                        <option 
                            key={org._id}
                            value={org._id}
                        >
                            {org.name}
                        </option>)}
                </select>
            ) : 
                <span>
                    {orgName}
                </span> 
            
        )
    }
}

AdminSelectOrganisationComponent.defaultProps = {
    selectedOrganisation: '',
};

AdminSelectOrganisationComponent.propTypes = {
    user: PropTypes.object.isRequired,
    organisations: PropTypes.arrayOf(PropTypes.object).isRequired,
    editing: PropTypes.bool.isRequired,
    selectedOrganisation: PropTypes.string
};
  
export default AdminSelectOrganisationComponent;