import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';


class EditorTimeComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          selected : this.props.activity.time,
          editing: false
      }
    }

    saveTime = (selection) => {        
        const activityId = this.props.activity._id;
        Meteor.call('activities.updateAttributes', 
        activityId, 'time', selection.value,
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
    
    getTimeOptions = () => {
        return [ 
            { value: "timevs", label: i18n.__('activity.timevs') }, 
            { value: "timesh", label: i18n.__('activity.timesh') }, 
            { value: "timemd", label : i18n.__('activity.timemd') },
            { value: "timeln", label:  i18n.__('activity.timeln') }, 
            { value: "timevl", label : i18n.__('activity.timevl') }
        ];
    }

    render() {
        const { activity } = this.props;
        
        return (
                !this.state.editing ? 
                <Row className="EditorTimeComponent">
                    <Col xs="6">
                        {renderActivityBodyField('clock', 'activity.time')}
                        
                    </Col>
                    <Col xs="6" 
                        className="pt-2"
                        onClick={()=> this.setState({editing: true})} >
                        <span>{i18n.__(`activity.${activity.time}`)}</span>
                    </Col>
                </Row>
                : <Row className="EditorTimeComponent">
                    <Col xs="6">
                        {renderActivityBodyField('clock', 'activity.time')}
                    </Col>
                    <Col xs="6">
                        <Select 
                            className="basic-single TimeSelector"
                            classNamePrefix="time-edit"
                            isSearchable={false}
                            isClearable={false}
                            placeholder={this.state.selected}
                            options={this.getTimeOptions()}
                            name="timeSelect"
                            value={this.state.selected}
                            onChange={(selection) => this.saveTime(selection)}
                            aria-label="Edit Time"
                        />
                    </Col>
                </Row>
        )
    }
}
  
EditorTimeComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};
export default EditorTimeComponent;

