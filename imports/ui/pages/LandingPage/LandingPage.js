import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import StoriesCollection from '../../../api/Stories/Stories';
import Loading from '../../components/Loading/Loading';
import LoginModalController from '../../components/LoginModal/LoginModalController';
import './LandingPage.scss';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render () {
    const { loading, stories, match, history, userId, viewportIsMobile, ...props } = this.props;
    return (!loading ? (
      <div className="container LandingPage">
        <Row>
          <Col xs={12} id="stories" className="stories">
                <h5>Site Content</h5>
                {!userId && viewportIsMobile &&
                <Row>
                    <Col xs={12}>
                    <LoginModalController className={"StoriesLogin"} />
                    </Col>
                </Row>}
                <Row>

                </Row>
                <Row className="feedbackRow">
                  <Col xs={{size: 12}} sm={{size: 6, offset: 3}} lg={{size: 4, offset: 4}} className="feedbackCol">

                  </Col>
                </Row>
          </Col>
        </Row>
      </div>
    ) : <Loading />
  )
}
}

LandingPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.string,
};

export default withTracker(() => {
  const storiesSub = Meteor.subscribe('stories.public');
  const userId = Meteor.userId();

  return {
    loading: !storiesSub.ready(),
    stories: StoriesCollection.find().fetch(),
    userId,
  };
})(LandingPage);
