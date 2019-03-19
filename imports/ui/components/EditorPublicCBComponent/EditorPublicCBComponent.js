import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import './EditorPublicCBComponent.scss';

class EditorPublicCBComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          public: this.props.activity.public
       }
    }

    handleCheckbox = (e) => {
        const checked = e.target.checked;
        this.setState({
            public : checked,
        });
        const activityId = this.props.activity._id;
        Meteor.call('activities.updateAttributes', 
        activityId, 'public', checked,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else { 
                Bert.alert(checked 
                    ? 'Activity published'
                    : 'Activity unpublished', 'success');
            }
        });
      }

    render() {
        return (
            <div className="EditorPublicCBComponent">
                <FormGroup check>
                    <label className="cbContainer">
                        <input
                            type="checkbox"
                            name="public"
                
                            checked={this.state.public}
                            onChange={this.handleCheckbox} />
                        <span className="cbCheckmark"></span>
                        {i18n.__('activity.public')}
                    </label>
                </FormGroup>
            </div>
        )
    }
}
  
EditorPublicCBComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default EditorPublicCBComponent;