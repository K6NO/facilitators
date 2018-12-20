/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, FormGroup } from 'reactstrap';
import './StoryCriteriaComponent.scss';

const defaultSide = {
    side: '',
    point1Starting: 50,
    point2Starting: 50,
    point3Starting: 50,
    point1Winning: 50,
    point2Winning: 50,
    point3Winning: 50,
    assessmentVictory: 'Success',
    assessmentPartialVictory: 'Partial Success',
    assessmentFailure: 'Failure',
    assessment1Victory: 'Congratulations',
    assessment1Failure: 'Sorry, but...',
    assessment2Victory: 'Congratulations',
    assessment2Failure: 'Sorry, but...',
    assessment3Victory: 'Congratulations',
    assessment3Failure: 'Sorry, but...',
    public: true,
  };

class StoryCriteriaComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        story: this.props.story || {},
        side: this.props.side || {},
      };
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.story) !== JSON.stringify(this.props.story)) {
            this.setState({story: nextProps.story});
        }
        if(JSON.stringify(nextProps.side) !== JSON.stringify(this.props.side)) {
            this.setState({side: nextProps.side});
        }
    }

    saveStory = (stateKey, newValue) => {
        // don't save for empty field or if there was no change
        if(newValue.trim().length > 0 && newValue !== this.props.story[stateKey]) {
            const updatedStory = this.state.story;
            ['owner', 'createdAt', 'updatedAt', 'stats'].forEach(e => delete updatedStory[e]);
            
            // set new value on story and side
            updatedStory[stateKey] = newValue;

            Meteor.call('stories.update', updatedStory, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert('Saving changes', 'success');
                }
            });
        }
    }

    saveSide = (stateKey, newValue) => {
        
        // don't save for empty field or if there was no change
        if(newValue.toString().trim().length > 0 && newValue !== this.props.side[stateKey]) {
            const updatedSide = this.state.side;
            ['owner', 'createdAt', 'updatedAt'].forEach(e => delete updatedSide[e]);
            
            // set new value on story and side
            updatedSide[stateKey] = newValue;

            Meteor.call('sides.update', updatedSide, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert('Saving changes', 'success');
                }
            });
        }
    }

    updateStory = (stateKey, newValue) => {
        this.setState({
            story : {
            ...this.state.story,
            [stateKey] : newValue,
            }
        });
    }

    updateSide = (stateKey, newValue) => {
        this.setState({
            side : {
            ...this.state.side,
            [stateKey] : newValue,
            }
        });
    }

    render() {
        return (
        <Row className="StoryCriteriaComponent">
            <Col sm={12}>
              <FormGroup>
                  <Table>
                    <tbody>
                        <tr>
                            <td>
                                Point Categories    
                            </td>
                            <td>
                                <input
                                    onChange={({target}) => this.updateStory('point1Name', target.value)}
                                    onBlur={({target}) => this.saveStory('point1Name', target.value)}
                                    type="text"
                                    className="form-control"
                                    name="point1Name"
                                    value={this.state.story && this.state.story.point1Name}
                                    placeholder="e.g. Diplomacy"
                                />
                            </td>
                            <td>
                                <input
                                    onChange={({target}) => this.updateStory('point2Name', target.value)}
                                    onBlur={({target}) => this.saveStory('point2Name', target.value)}
                                    type="text"
                                    className="form-control"
                                    name="point2Name"
                                    value={this.state.story && this.state.story.point2Name}
                                    placeholder="e.g. Popularity"
                                />
                            </td>
                            <td>
                                <input
                                    onChange={({target}) => this.updateStory('point3Name', target.value)}
                                    onBlur={({target}) => this.saveStory('point3Name', target.value)}
                                    type="text"
                                    className="form-control"
                                    name="point3Name"
                                    value={this.state.story && this.state.story.point3Name}
                                    placeholder="e.g. Budget"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Normal Difficulty</td>
                            <td>
                            <input
                                onChange={({target}) => this.updateSide('point1Winning', Number(target.value))}
                                onBlur={({target}) => this.saveSide('point1Winning', Number(target.value))}
                                type="text"
                                className="form-control"
                                name="easy-point1"
                                value={this.state.side && this.state.side.point1Winning}
                                placeholder="0"
                            />
                            </td>
                            <td>
                            <input
                                onChange={({target}) => this.updateSide('point2Winning', Number(target.value))}
                                onBlur={({target}) => this.saveSide('point2Winning', Number(target.value))}
                                type="text"
                                className="form-control"
                                name="easy-point2"
                                value={this.state.side && this.state.side.point2Winning}
                                placeholder="0"
                            />
                            </td>
                            <td>
                            <input
                                onChange={({target}) => this.updateSide('point3Winning', Number(target.value))}
                                onBlur={({target}) => this.saveSide('point3Winning', Number(target.value))}
                                type="text"
                                className="form-control"
                                name="easy-point3"
                                value={this.state.side && this.state.side.point3Winning}
                                placeholder=""
                            />
                            </td>
                        </tr>
                      <tr>
                        <td>Hard Difficulty</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="hard-point1"
                            defaultValue={70}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="hard-point2"
                            defaultValue={70}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="hard-point3"
                            defaultValue={70}
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                          <td>
                              Success Assessment
                          </td>
                          <td>
                            <textarea
                                type="textarea"
                                className="form-control assessmentText"
                                name="success1"
                                value={this.state.side && this.state.side.assessment1Victory}
                                placeholder="Something nice"
                                onChange={({target}) => this.updateSide('assessment1Victory', target.value)}
                                onBlur={({target}) => this.saveSide('assessment1Victory', target.value)}
                            />
                          </td>
                          <td>
                            <textarea
                                type="textarea"
                                className="form-control assessmentText"
                                name="success2"
                                value={this.state.side && this.state.side.assessment2Victory}
                                placeholder="Something nice"
                                onChange={({target}) => this.updateSide('assessment2Victory', target.value)}
                                onBlur={({target}) => this.saveSide('assessment2Victory', target.value)}
                            />
                          </td>
                          <td>
                            <textarea
                                type="textarea"
                                className="form-control assessmentText"
                                name="success3"
                                value={this.state.side && this.state.side.assessment3Victory}
                                placeholder="Something nice"
                                onChange={({target}) => this.updateSide('assessment3Victory', target.value)}
                                onBlur={({target}) => this.saveSide('assessment3Victory', target.value)}
                            />
                          </td>
                      </tr>
                      <tr>
                          <td>
                              Failure Assessment
                          </td>
                          <td>
                            <textarea
                                type="textarea"
                                className="form-control assessmentText"
                                name="failure1"
                                value={this.state.side && this.state.side.assessment1Failure}
                                placeholder="Something nice"
                                onChange={({target}) => this.updateSide('assessment1Failure', target.value)}
                                onBlur={({target}) => this.saveSide('assessment1Failure', target.value)}
                            />
                          </td>
                          <td>
                            <textarea
                                type="textarea"
                                className="form-control assessmentText"
                                name="failure2"
                                value={this.state.side && this.state.side.assessment2Failure}
                                placeholder="Something nice"
                                onChange={({target}) => this.updateSide('assessment2Failure', target.value)}
                                onBlur={({target}) => this.saveSide('assessment2Failure', target.value)}
                            />
                          </td>
                          <td>
                            <textarea
                                type="textarea"
                                className="form-control assessmentText"
                                name="failure3"
                                value={this.state.side && this.state.side.assessment3Failure}
                                placeholder="Something nice"
                                onChange={({target}) => this.updateSide('assessment3Failure', target.value)}
                                onBlur={({target}) => this.saveSide('assessment3Failure', target.value)}
                            />
                          </td>
                      </tr>
                    </tbody>
                  </Table>
              </FormGroup>
            </Col>
          </Row>
        )
    }
}

StoryCriteriaComponent.defaultProps = {
    story: {},
    side: defaultSide,
  };
  
StoryCriteriaComponent.propTypes = {
    story: PropTypes.object,
    side: PropTypes.object,
};


export default StoryCriteriaComponent;