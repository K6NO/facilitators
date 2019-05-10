import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import EditorRTE from '../EditorRTE/EditorRTE';

class EditorPreparationsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          preparations : this.props.activity.preparations[this.props.language],
          editing: false
      }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.language !== nextProps.language) {
            this.setState({
                preparations : nextProps.activity.preparations[nextProps.language]
            })
        }
    }

    savePreps = (value) => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;
        Meteor.call('activities.updateLangAttributes', 
        activityId, 'preparations', language, value,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Saved changes', 'success');
            }
        });
        this.setState({
            editing: false,
        });
    }

    render() {
        const { activity, language } = this.props;
        
        return (
                !this.state.editing ? 
                <Row className="EditorPreparationsComponent">
                    <Col
                        onClick={()=> this.setState({editing: true})}>
                        {renderActivityBodyField('pause-circle', 'activity.preparations')}
                        <div dangerouslySetInnerHTML={{__html: activity.preparations[`${language}`]}}>
                        </div>
                    </Col>
                </Row>
                : <Row className="EditorPreparationsComponent">
                    <Col>
                        {renderActivityBodyField('pause-circle', 'activity.preparations')}
                        <EditorRTE
                            startValue={this.props.activity.preparations[this.props.language]}
                            saveCallback={this.savePreps}
                            maxValue={400}
                        /> 
                    </Col>
                </Row>
        )
    }
}
  
EditorPreparationsComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
export default EditorPreparationsComponent;

