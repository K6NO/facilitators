import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import EditorRTE from '../EditorRTE/EditorRTE';

class EditorObjectivesComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          objectives : this.props.activity.objectives[this.props.language],
          editing: false
      }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.language !== nextProps.language) {
            this.setState({
                objectives : nextProps.activity.objectives[nextProps.language],
                editing: false 
            });
        }
    }



    saveObjectives = (value) => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;
        Meteor.call('activities.updateLangAttributes', 
        activityId, 'objectives', language, value,
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
                <Row className="EditorObjectivesComponent">
                    <Col
                        onClick={()=> this.setState({editing: true})}>
                        {renderActivityBodyField('bullseye', 'activity.objectives')}
                        <div dangerouslySetInnerHTML={{__html: activity.objectives[`${language}`]}}>
                            
                        </div>
                    </Col>
                </Row>
                : <Row className="EditorObjectivesComponent">
                    <Col>
                        {renderActivityBodyField('bullseye', 'activity.objectives')}
                        <EditorRTE
                            startValue={this.props.activity.objectives[this.props.language]}
                            saveCallback={this.saveObjectives}
                            maxValue={400}
                        /> 
                    </Col>
                </Row>
        )
    }
}
  
EditorObjectivesComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
export default EditorObjectivesComponent;

