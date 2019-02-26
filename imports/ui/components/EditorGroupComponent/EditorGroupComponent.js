import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';


class EditorGroupComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          selected : this.props.activity.group,
          editing: false
      }
    }

    saveGroup = (selection) => {        
        const activityId = this.props.activity._id;
        Meteor.call('activities.updateAttributes', 
        activityId, 'group', selection.value,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else {
                this.setState({
                    selected: selection.value,
                    editing: false
                });
                Bert.alert('Saved changes', 'success');
            }
        });
    }
    
    getGroupOptions = () => {
        return [ 
            { value: "groupvs", label: i18n.__('activity.groupvs') }, 
            { value: "groupsm", label: i18n.__('activity.groupsm') }, 
            { value: "groupmd", label : i18n.__('activity.groupmd') },
            { value: "grouplg", label:  i18n.__('activity.grouplg') }, 
            { value: "groupvl", label : i18n.__('activity.groupvl') }
        ];
    }

    render() {
        const { activity } = this.props;
        
        return (
                !this.state.editing ? 
                <Row className="EditorGroupComponent">
                    <Col xs="6">
                        {renderActivityBodyField('users', 'activity.group')}
                        
                    </Col>
                    <Col xs="6" 
                        className="pt-2"
                        onClick={()=> this.setState({editing: true})} >
                        <span>{i18n.__(`activity.${activity.group}`)}</span>
                    </Col>
                </Row>
                : <Row className="EditorGroupComponent">
                    <Col xs="6">
                        {renderActivityBodyField('users', 'activity.group')}
                    </Col>
                    <Col xs="6">
                        <Select 
                            className="basic-single GroupSelector"
                            classNamePrefix="group-edit"
                            isSearchable={false}
                            isClearable={false}
                            placeholder={this.state.selected}
                            options={this.getGroupOptions()}
                            name="groupSelect"
                            value={this.state.selected}
                            onChange={(selection) => this.saveGroup(selection)}
                            aria-label="Edit Group"
                        />
                    </Col>
                </Row>
        )
    }
}
  
EditorGroupComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};
export default EditorGroupComponent;

