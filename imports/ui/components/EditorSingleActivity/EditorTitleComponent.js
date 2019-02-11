import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Icon from '../Icon/Icon';

class EditorTitleComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          title : this.props.title,
          editing: false
      }
    }

    updateTitle = (e) => {
        this.setState({title: e.value})
    }
    saveTitle = () => {
        const { language } = this.props;
        const activityId = this.props.activity._id;
        Meteor.call('activities.updateLangAttributes', 
        activityId, 'title', language, this.state.title,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else { 
                Bert.alert('Saved changes', 'success');
            }
        });
        this.setState({editing: false})
    }

    render() {
        return (
            <div className="EditorTitleComponent">
                {editing 
                ? <input 
                    className="activityTitleEditing"
                    value={this.state.title}
                    onChange={this.updateTitle}
                    onBlur={this.saveTitle} />
                : <h2 
                    className="activityTitle"
                    onClick={()=> this.setState({editing: true})}>{activity.title[`title.${language}`] || 'Click here to add a title'}</h2>}
            </div>
        )
    }
}

EditorTitleComponent.defaultProps = {
};
  
EditorActivityHeader.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};


export default EditorTitleComponent;
