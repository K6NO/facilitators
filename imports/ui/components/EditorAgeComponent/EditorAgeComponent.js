import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import Icon from '../Icon/Icon';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';

const ageOptions = [ 
    { "agech" : i18n.__('activity.agech') }, 
    { "agete" : i18n.__('activity.agete') }, 
    { "ageya" : i18n.__('activity.ageya') },
    { "agead" : i18n.__('activity.agead') }, 
    { "ageel" : i18n.__('activity.ageel') }
];


class EditorAgeComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          selected : this.props.activity.age,
          editing: false
      }
    }

    saveAge = (selection) => {        
        const activityId = this.props.activity._id;
        console.log({selection})
        // Meteor.call('activities.updateAttributes', 
        // activityId, 'category', selection.value,
        // (error) => {
        //     if(error) {
        //         Bert.alert(error.reason, 'danger');
        //     } else {
        //         this.setState({
        //             selected: selection.value,
        //             editing: false
        //         });
        //         Bert.alert('Saved changes', 'success');
        //     }
        // });
    }

    render() {
        const { activity } = this.props;
        return (
                !this.state.editing ? 
                <Row className="EditorAgeComponent">
                    <Col xs="6">
                        {renderActivityBodyField('address-card', 'activity.age')}
                        
                    </Col>
                    <Col xs="6" 
                        className="pt-2"
                        onClick={()=> this.setState({editing: true})} >
                        <span>{i18n.__(`activity.${activity.age}`)}</span>
                    </Col>
                </Row>
                : <Row className="EditorAgeComponent">
                    <Col xs="6">
                        {renderActivityBodyField('address-card', 'activity.age')}
                    </Col>
                    <Col xs="6">
                        <Select 
                            className="basic-single AgeSelector"
                            classNamePrefix="age-edit"
                            isSearchable={false}
                            isClearable={false}
                            options={ageOptions}
                            name="ageSelect"
                            value={this.state.selected}
                            onChange={(selection) => this.saveAge(selection)}
                            aria-label="Edit Age"
                        />
                    </Col>
                </Row>
        )
    }
}
  
EditorAgeComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};
export default EditorAgeComponent;

