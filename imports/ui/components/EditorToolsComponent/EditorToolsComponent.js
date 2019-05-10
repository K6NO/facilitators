import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import { StyledTextarea } from '../EditorStyledComponents/EditorStyledComponets';
import CharacterCounter from '../CharacterCounter/CharacterCounter';
import EditorRTE from '../EditorRTE/EditorRTE';

class EditorToolsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          tools : this.props.activity.tools[this.props.language],
          editing: false
      }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.language !== nextProps.language) {
            this.setState({
                tools : nextProps.activity.tools[nextProps.language]
            })
        }
    }

    // updateTools = (e) => {
    //     this.setState({tools: e.target.value})
    // }

    saveTools = (value) => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;

        Meteor.call('activities.updateLangAttributes', 
        activityId, 'tools', language, value,
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
                <Row className="EditorToolsComponent">
                    <Col
                        onClick={()=> this.setState({editing: true})}>
                        {renderActivityBodyField('wrench', 'activity.tools')}
                        <div dangerouslySetInnerHTML={{__html: activity.tools[`${language}`]}}>
                        </div>
                    </Col>
                </Row>
                : <Row className="EditorToolsComponent">
                    <Col>
                        {renderActivityBodyField('wrench', 'activity.tools')}
                        {/* <CharacterCounter> */}
                            <EditorRTE
                                startValue={this.props.activity.tools[this.props.language]}
                                saveCallback={this.saveTools}
                                maxValue={400}
                             /> 
                            {/* <StyledTextarea
                                ref={toolsTextarea => toolsTextarea && toolsTextarea.focus()}
                                className="activityToolsEditing"
                                value={this.state.tools}
                                onChange={this.updateTools}
                                maxLength={400}
                                name="tools"
                                onBlur={this.saveTools} /> */}
                        {/* </CharacterCounter> */}
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

