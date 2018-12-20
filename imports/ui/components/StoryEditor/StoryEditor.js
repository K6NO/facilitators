/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Button, Input } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import ImageSelector from '../ImageSelector/ImageSelector';
import SideNamesComponent from './SideNamesComponent';
import ReactSelect from 'react-select';
import StoryCriteriaContainer from './StoryCriteriaContainer';
import './StoryEditor.scss';



class StoryEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      story: this.props.story || {},
      side1: this.props.sides[0] || {},
      side2: this.props.sides[1] || {},
    };
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        description: {
          required: true,
        },
        imageUrl: {
            required: true,
        },
        side1Name: {
            required: true,
        },
        // side2Name: {
        //     required: true,
        // },
        point1Name: {
            required: true,
        },
        point2Name: {
            required: true,
        },
        point3Name: {
            required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title here.',
        },
        description: {
          required: 'Need a description.',
        },
        imageUrl: {
            required: 'Need to add a cover image URL',
        },
        side1Name: {
            required: 'Name the first side of the story.',
        },
        side2Name: {
            required: 'Name the second side of the story.',
        },
        point1Name: {
            required: 'Name the category of the first point.',
        },
        point2Name: {
          required: 'Name the category of the second point.',
        },
        point3Name: {
            required: 'Name the category of the third point.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  componentWillReceiveProps(nextProps) {
    // update story
    if(JSON.stringify(nextProps.story) !== JSON.stringify(this.props.story)) {      
      this.setState({story: nextProps.story});
    };

    // update sides
    if(JSON.stringify(nextProps.sides[0]) !== JSON.stringify(this.props.sides[0])) {
      this.setState({side1: nextProps.sides[0]});
    }
    if(JSON.stringify(nextProps.sides[1]) !== JSON.stringify(this.props.sides[1])) {
      this.setState({side2: nextProps.sides[1]});
    }
  }

  handleCheckbox = (e) => {
    this.setState({
      story: {
        ...this.state.story,
        public : e.target.checked,
      },
    });
    this.saveStory('public', e.target.checked);
  }

  handleStoryPlayLengthSelect = (selection) => {
    this.setState({
      story : {
        ...this.state.story,
        playLength : selection ? selection.value : '',
      }
    });
    if(selection.value !== this.state.story.playLength) {
      this.saveStory('playLength', Number(selection.value));
    }
    
  }

  handleNumberOfRandomEvents = (selection) => {
    this.setState({
      story: {
        ...this.state.story,
        randomEvents : selection ? selection.value : '',
      },
    });
    if(selection.value !== this.state.story.randomEvents) {
      this.saveStory ('randomEvents', Number(selection.value));
    } 
  }

  handleAdvisor = (selection, number) => {
    if (number === 1) {
      this.setState({
        story: {
          ...this.state.story,
          storyAdvisor1 : selection ? selection.value : '',
        }});
      if(selection.value !== this.state.story.storyAdvisor1) {
        this.saveStory('storyAdvisor1', selection.value);
      }
    } else {
      this.setState({
        story: {
          ...this.state.story,
          storyAdvisor2 : selection ? selection.value : '',
        }});
        if(selection.value !== this.state.story.storyAdvisor2) {
          this.saveStory('storyAdvisor2', selection.value);
        }
    }
  }

  handleSubmit() {
    const { story, history } = this.props;
    history.push(`/editor/stories/${story._id}`);
  }

  saveStory = (stateKey, newValue) => {
    const { story } = this.props;
    story[stateKey] = newValue;
    ['createdAt', 'updatedAt', 'owner', 'stats'].forEach(e => delete story[e]);

    // save chapter
    Meteor.call('stories.update', story, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else { 
        Bert.alert(story.title + ' saved', 'success');
      }
    });
  }

  updateStory = (stateKey, newValue) => {
    this.setState({
      story: {
        ...this.state.story,
        [stateKey] : newValue,
      }
    });
  }

  render() {
    const { story, sides } = this.props;
    
    return (
    <div className="StoryEditor">
      <div className="border">
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <Row>
            <Col sm={8}>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label>Title</Label>
                    <input
                      onChange={({target}) => this.updateStory('title', target.value)}
                      onBlur={({target}) => this.saveStory('title', target.value)}
                      type="text"
                      className="form-control"
                      name="title"
                      value={this.state.story && this.state.story.title}
                      placeholder="Add a title for the story"
                    />
                  </FormGroup>
                </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <FormGroup>
                  <Label>Description</Label>
                  <textarea
                    onChange={({target}) => this.updateStory('description', target.value)}
                    onBlur={({target}) => this.saveStory('description', target.value)}
                    className="form-control formTextArea"
                    name="description"
                    value={this.state.story && this.state.story.description}
                    placeholder="Describe the main plot"
                  />
                </FormGroup>
              </Col>
            </Row>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Choose a cover Image</Label>
                <ImageSelector 
                  url={story && story.imageUrl} 
                  nameFlag="imageUrl"
                  callback={this.saveStory}
                  />
              </FormGroup>
            </Col>
          </Row>
          <SideNamesComponent 
            story={story}
            sides={sides}
          />
          <Row>
            <Col sm={4}>
              <FormGroup>
                <Label>Length of the Newsgame</Label>
                  <ReactSelect
                    name="playLength"
                    value={this.state.story.playLength}
                    resetValue=""
                    options={[
                      { value: '10', label: 'Ten - 10-12 min gameplay'},
                      { value: '12', label: 'Twelve - 12-15 min gameplay'},
                      { value: '14', label: 'Fourteen - 15-18 min gameplay'},
                    ]}
                    onChange= {this.handleStoryPlayLengthSelect}
                  />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Number of random events</Label>
                  <ReactSelect
                    name="random"
                    value={this.state.story.randomEvents}
                    resetValue=""
                    options={[
                      { value: '0', label: 'None'},
                      { value: '1', label: 'One'},
                      { value: '2', label: 'Two'},
                      { value: '3', label: 'Three'},
                    ]}
                    onChange= {this.handleNumberOfRandomEvents}
                  />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <FormGroup>
                <Label>First Advisor in the Story</Label>
                  <ReactSelect
                      name="storyAdvisor1"
                      value={this.state.story.storyAdvisor1}
                      resetValue=""
                      options={[
                        { value: 'Foreign Policy Advisor', label: 'Foreign Policy Advisor'},
                        { value: 'National Security Advisor', label: 'National Security Advisor'},
                        { value: 'Domestic Policy Advisor', label: 'Domestic Policy Advisor'},
                      ]}
                      onChange= {(selection) => this.handleAdvisor(selection, 1)}
                    />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Second Advisor in the Story</Label>
                  <ReactSelect
                      name="storyAdvisor2"
                      value={this.state.story.storyAdvisor2}
                      resetValue=""
                      options={[
                        { value: 'Foreign Policy Advisor', label: 'Foreign Policy Advisor'},
                        { value: 'National Security Advisor', label: 'National Security Advisor'},
                        { value: 'Domestic Policy Advisor', label: 'Domestic Policy Advisor'},
                      ]}
                      onChange= {(selection) => this.handleAdvisor(selection, 2)}
                    />
              </FormGroup>
            </Col>
          </Row>
          <StoryCriteriaContainer 
            story={story}
            sides={sides}
            />
          <Row>
            <Col className="checkboxDiv" sm="12">
              <FormGroup>
                <Label check>
                  <Input
                    type="checkbox"
                    name="public"
        
                    checked={this.state.story.public}
                    onChange={this.handleCheckbox} />
                      {' '}
                      .....Check to publish story
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Button type="submit" className="saveButton" color="success">
                Continue
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
    );
  }
}

StoryEditor.defaultProps = {
  story: { title: '', description: '',
          imageUrl: '', side1Name: '',
          side2Name: '', point1Name: '',
          point2Name: '', point3Name: '',
          playLength : '', randomEvents: '',
          storyAdvisor1: '', storyAdvisor2: '', },
  sides: [],
};

StoryEditor.propTypes = {
  story: PropTypes.object,
  sides: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
};

export default StoryEditor;
