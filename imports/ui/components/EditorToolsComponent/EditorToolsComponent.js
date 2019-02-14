import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';


class EditorToolsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          tools : this.props.activity.tools[this.props.language],
          editing: false
      }
    }

    updateTools = (e) => {
        this.setState({tools: e.target.value})
    }

    saveTools = () => {        
        const activityId = this.props.activity._id;
        // const { language } = this.props;
        const language = 'es'

        Meteor.call('activities.updateLangAttributes', 
        activityId, 'tools', language, this.state.tools,
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
        const { activity } = this.props;
        const language = 'es'
        return (
                !this.state.editing ? 
                <Row className="EditorToolsComponent">
                    <Col
                        onClick={()=> this.setState({editing: true})}>
                        {renderActivityBodyField('wrench', 'activity.tools')}
                        <p>
                            {activity.tools[`${language}`]}
                        </p>
                    </Col>
                </Row>
                : <Row className="EditorToolsComponent">
                    <Col>
                        {renderActivityBodyField('wrench', 'activity.tools')}
                        <textarea
                            className="activityToolsEditing"
                            value={this.state.tools}
                            onChange={this.updateTools}
                            onBlur={this.saveTools} />

                    </Col>
                </Row>
        )
    }
}
  
EditorToolsComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
export default EditorToolsComponent;

