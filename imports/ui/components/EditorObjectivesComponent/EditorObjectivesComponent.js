import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import CharacterCounter from '../CharacterCounter/CharacterCounter';
import { StyledTextarea } from '../EditorStyledComponents/EditorStyledComponets';

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
                objectives : nextProps.activity.objectives[nextProps.language]
            })
        }
    }

    updateObjectives = (e) => {
        this.setState({objectives: e.target.value})
    }

    saveObjectives = () => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;
        Meteor.call('activities.updateLangAttributes', 
        activityId, 'objectives', language, this.state.objectives,
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
                        <p>
                            {activity.objectives[`${language}`]}
                        </p>
                    </Col>
                </Row>
                : <Row className="EditorObjectivesComponent">
                    <Col>
                        {renderActivityBodyField('bullseye', 'activity.objectives')}
                        <CharacterCounter>
                            <StyledTextarea
                                ref={objectivesTextarea => objectivesTextarea && objectivesTextarea.focus()}
                                className="activityObjectivesEditing"
                                value={this.state.objectives}
                                onChange={this.updateObjectives}
                                onBlur={this.saveObjectives}
                                maxLength={400} />
                        </CharacterCounter>
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

