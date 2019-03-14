import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import { StyledTallTextarea } from '../EditorStyledComponents/EditorStyledComponets';

class EditorDescriptionComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          description : this.props.activity.description[this.props.language],
          editing: false
      }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.language !== nextProps.language) {
            this.setState({
                description : nextProps.activity.description[nextProps.language]
            })
        }
    }
    

    updateDescription = (e) => {
        this.setState({description: e.target.value})
    }

    saveDescription = () => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;

        Meteor.call('activities.updateLangAttributes', 
        activityId, 'description', language, this.state.description,
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
                <Row className="EditorDescriptionComponent">
                    <Col
                        onClick={()=> this.setState({editing: true})}>
                        {renderActivityBodyField('align-left', 'activity.description')}
                        <p>
                            {activity.description[`${language}`]}
                        </p>
                    </Col>
                </Row>
                : <Row className="EditorDescriptionComponent">
                    <Col>
                        {renderActivityBodyField('align-left', 'activity.description')}
                        <StyledTallTextarea
                            ref={descriptionTextarea => descriptionTextarea && descriptionTextarea.focus()}
                            className="activitydescriptionEditing"
                            value={this.state.description}
                            onChange={this.updateDescription}
                            onBlur={this.saveDescription} />

                    </Col>
                </Row>
        )
    }
}
  
EditorDescriptionComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
export default EditorDescriptionComponent;

