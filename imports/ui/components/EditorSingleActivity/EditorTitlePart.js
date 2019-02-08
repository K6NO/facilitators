import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Badge } from 'reactstrap';
import './EditorActivityHeader.scss';
import { getCategoryName, getCategoryArray } from '../../../modules/get-category-name';

class EditorTitlePart extends React.Component {
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
        Meteor.methods('')
    }

    render() {
        return (
            <div className="EditorTitlePart">
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

EditorTitlePart.defaultProps = {
    title: ''
};
  
EditorActivityHeader.propTypes = {
    title: PropTypes.string,
};


export default EditorTitlePart;

