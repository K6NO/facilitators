import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import EditorRTE from '../EditorRTE/EditorRTE';
import i18n from 'meteor/universe:i18n';

class EditorResourcesComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          resources : this.props.activity.resources[i18n.getLocale()],
          editing: false
      }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.language !== nextProps.language) {
            this.setState({
                resources : nextProps.activity.resources[nextProps.language]
            })
        }
    }

    saveResources = (value) => {        
        const activityId = this.props.activity._id;
        const { language } = this.props;

        Meteor.call('activities.updateLangAttributes', 
        activityId, 'resources', language, value,
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
                        <div dangerouslySetInnerHTML={{__html: activity.resources[`${language}`]}}>
                        </div>
                    </Col>
                </Row>
                : <Row className="EditorResourcesComponent">
                    <Col>
                        {renderActivityBodyField('book-open', 'activity.resources')}
                        <EditorRTE
                            startValue={this.props.activity.resources[this.props.language]}
                            saveCallback={this.saveResources}
                            maxValue={400}
                        /> 
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

