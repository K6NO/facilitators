import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Loading from '../Loading/Loading';
import Images from '../../../api/Files/Images';

import './Tags.scss';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateValue: '',
    };
    this.updateTags = this.updateTags.bind(this);
    this.changeTagInput = this.changeTagInput.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  updateTags(image){
    //access state and update tags on image
    const newTags = this.state.updateValue.split(/[\s,]+/);
    const concatTags = image.tags.concat(newTags);
    const updateObject = { 
      _id: image._id,
      tags : concatTags 
    };

    Meteor.call('images.updateTags', updateObject);
    this.setState({updateValue: ''});
  }

  handleEnterPress (e, image) {
    if(e.key === 'Enter'){
      this.updateTags(image);
    }
  }

  deleteTag(e, image){
    const tagToRemove = e.target.name;
    const index = image.tags.indexOf(tagToRemove);
    image.tags.splice(index, 1);
    const updateObject = { 
      _id: image._id,
      tags : image.tags};
    Meteor.call('images.updateTags', updateObject);

  };

  changeTagInput(e){
    this.setState({updateValue : e.target.value});
  }

  render() {
    const {image} = this.props;

    return (
      <div>
        {image.tags.map((tag) => (
          <Row key={tag}>
            <Col className="tagCapsule" >
              <span className="label label-primary">{tag} 
              <Button
                name={tag}
                color="danger"
                size="sm"
                onClick={(e)=>this.deleteTag(e, image)} >x</Button>
              </span>
            </Col>
            </Row>
        ))}
        <Row className="newTagContainer">
          <Col xs={8}>
            <input
                  type="text"
                  value={this.state.updateValue}
                  onChange={this.changeTagInput}
                  onKeyPress={(e) => this.handleEnterPress(e, image)}
                  />
          </Col>
          <Col xs={4}>
            <Button
              color="primary"
              size="sm"
              onClick={(e) => this.updateTags(image)}
              > +
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Tags;
