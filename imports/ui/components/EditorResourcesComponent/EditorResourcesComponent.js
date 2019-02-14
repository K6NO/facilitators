import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';


class EditorResourcesComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          resources : this.props.activity.resources[this.props.language],
          editing: false
      }
    }

    updateResources = (e) => {
        this.setState({resources: e.target.value})
    }

    saveResources = () => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;

        Meteor.call('activities.updateLangAttributes', 
        activityId, 'resources', language, this.state.resources,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Saved changes', 'success');
            }
        });
        this.setState({
            editing: false
        });
    }

    render() {
        const { activity, language } = this.props;
        return (
                !this.state.editing ? 
                <Row className="EditorResourcesComponent">
                    <Col
                        onClick={()=> this.setState({editing: true})}>
                        {renderActivityBodyField('book-open', 'activity.resources')}
                        <p>
                            {activity.resources[`${language}`]}
                        </p>
                    </Col>
                </Row>
                : <Row className="EditorResourcesComponent">
                    <Col>
                        {renderActivityBodyField('book-open', 'activity.resources')}
                        <textarea
                            className="activityResourcesEditing"
                            value={this.state.resources}
                            onChange={this.updateResources}
                            onBlur={this.saveResources} />

                    </Col>
                </Row>
        )
    }
}
  
EditorResourcesComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
export default EditorResourcesComponent;

