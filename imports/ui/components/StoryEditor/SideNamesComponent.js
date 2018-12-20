/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Row, Col } from 'reactstrap';

const defaultSide = {
    side: '',
    point1Starting: 50,
    point2Starting: 50,
    point3Starting: 50,
    point1Winning: 50,
    point2Winning: 50,
    point3Winning: 50,
    assessmentVictory: 'Success',
    assessmentPartialVictory: 'Half Empty or Full',
    assessmentFailure: 'Failure',
    assessment1Victory: 'Congratulations',
    assessment1Failure: 'Sorry, but...',
    assessment2Victory: 'Congratulations',
    assessment2Failure: 'Sorry, but...',
    assessment3Victory: 'Congratulations',
    assessment3Failure: 'Sorry, but...',
    public: true,
  };

class SideNamesComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            story: this.props.story,
            side1: this.props.sides[0] || defaultSide,
            side2: this.props.sides[1] || defaultSide,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.story) !== JSON.stringify(this.props.story)) {
            this.setState({story: nextProps.story});
        }
        if(JSON.stringify(nextProps.sides[0]) !== JSON.stringify(this.props.sides[0])) {
            this.setState({side1: nextProps.sides[0]});
        }
        if(JSON.stringify(nextProps.sides[1]) !== JSON.stringify(this.props.sides[1])) {
            this.setState({side2: nextProps.sides[1]});
        }
    }

    saveSideName = (stateKey, newValue) => {
        // save only if the field is not empty ()
        if(newValue.trim().length > 0) {
            const updatedStory = this.state.story;
            const updatedSide = stateKey === 'side1Name' ? this.state.side1 : this.state.side2;
            ['owner', 'createdAt', 'updatedAt', 'stats'].forEach(e => delete updatedStory[e]);
            ['owner', 'createdAt', 'updatedAt'].forEach(e => delete updatedSide[e]);
            
            // set sidename on story and side
            updatedStory[stateKey] = newValue;
            updatedSide.side = newValue;
            updatedSide.storyId = updatedStory._id;
            
            // create new side or update existing
            const methodCall = updatedSide._id ? 'sides.update' : 'sides.insert';
            
            // update story and insert/update side
            Meteor.call('stories.update', updatedStory, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Meteor.call(methodCall, updatedSide, (error, sideId) => {
                        if (error) {
                            Bert.alert(error.reason, 'danger');
                        } else { 
                            Bert.alert('Saving changes', 'success');
                        }
                    });
                }
            });
        }
    }

    render () {
        return (
            <Row>
            <Col sm={4}>
              <FormGroup>
                <Label>Name the first side</Label>
                <input
                  onChange={({target}) => this.setState(prevState => ({
                    story: {
                      ...prevState.story,
                      side1Name : target.value,
                    },
                    side1: {
                      ...prevState.side1,
                      side : target.value,
                    }
                  }))}
                  onBlur={({target}) => this.saveSideName('side1Name', target.value)}
                  type="text"
                  className="form-control"
                  name="side1Name"
                  value={this.state.story && this.state.story.side1Name || ''}
                  placeholder="e.g. German Chancellor"
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Name the second side</Label>
                <input
                  onChange={({target}) => this.setState(prevState => ({
                    story: {
                      ...prevState.story,
                      side2Name : target.value,
                    },
                    side2: {
                      ...prevState.side2,
                      side : target.value,
                    }
                  }))}
                  onBlur={({target}) => this.saveSideName('side2Name', target.value)}
                  type="text"
                  className="form-control"
                  name="side2Name"
                  value={this.state.story && this.state.story.side2Name || ''}
                  placeholder="e.g. UN Secretary General"
                />
              </FormGroup>
            </Col>
          </Row>
        )
    }
}

SideNamesComponent.defaultProps = {
    story: {},
    side1: defaultSide,
    side2: defaultSide,
}

SideNamesComponent.propTypes = {
    story: PropTypes.object,
    side1: PropTypes.object,
    side2: PropTypes.object,
}

export default SideNamesComponent;