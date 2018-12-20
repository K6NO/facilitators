/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Label } from 'reactstrap';
import StoryCriteriaComponent from './StoryCriteriaComponent';
import './StoryCriteriaContainer.scss';

class StoryCriteriaContainer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        story: this.props.story || {},
        side1: this.props.sides[0] || {},
        side2: this.props.sides[1] || {},
        index: 0,
      };
    }

    switchSides = (index) => {
        this.setState({
          index: index,
        });
    }

    render() {
        
        const { story, sides } = this.props;
        const { index } = this.state;
        return (
            <div className="border StoryCriteriaContainer">
                <Row className="row-no-padding">
                    <Col xs={12}>
                        <Label>Success criteria for {index === 0 ? story.side1Name : story.side2Name}</Label>
                        {story.side1Name ?
                        <Col sm={6}>
                        <Button
                            type="button"
                            className={`switchButton ${this.state.index === 0 ? 'activeButton' : ''}`}
                            onClick={()=> this.switchSides(0)}>
                            Edit {story.side1Name}
                        </Button>
                        </Col> : ''}
                        {story.side2Name ?
                        <Col sm={6}>
                        <Button
                            type="button"
                            className={`switchButton ${this.state.index === 1 ? 'activeButton' : ''}`}
                            onClick={()=> this.switchSides(1)}>
                            Edit {story.side2Name}
                        </Button>
                        </Col> : ''}
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <StoryCriteriaComponent
                            story={story}
                            side={index === 0 ? sides[0] : sides[1]}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

StoryCriteriaContainer.defaultProps = {
    story: {},
    sides: []
  };
  
  StoryCriteriaContainer.propTypes = {
    story: PropTypes.object,
    sides: PropTypes.arrayOf(PropTypes.object),
};


export default StoryCriteriaContainer;