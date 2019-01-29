import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import LoginModalController from '../../components/LoginModal/LoginModalController';
import './LandingPage.scss';
import ActivityComponentFooter from '../../components/ActivityComponent/ActivityComponentFooter';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render () {
    const { loading, match, history, userId, viewportIsMobile, ...props } = this.props;
    return (!loading ? (
      <div className="container LandingPage">
        <Row>
          <Col xs={12} id="stories" className="stories">
                <ActivityComponentFooter
                  category={'Land art'}
                />
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.string,
};

export default withTracker(() => {
  const userId = Meteor.userId();

  return {
    loading: false,
    userId,
  };
})(LandingPage);
