import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import ActivityComponent from '../../components/ActivityComponent/ActivityComponent';
import ActivityComponentWrapper from '../../components/ActivityComponent/ActivityComponentWrapper';
import SearchBox from '../../components/SearchBox/SearchBox';
import i18n from 'meteor/universe:i18n';
import './LandingPage.scss';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityId: '',
      singleActivity: false,
      searchObject: {}
    };
  };

  setActivityId = (activityId) => {
    this.setState({
      activityId: activityId,
      singleActivity: true,
    });
  }

  updateSearchObject = (key, value) => {
    this.setState({
        searchObject : {
            ...this.state.searchObject,
            [key]: value
        },
        singleActivity : false,
    });
  }

  backToActivitiesGrid = () => {
    this.setState({
      singleActivity: false,
    });
  }


  render () {
    const { loading, match, history, userId, viewportIsMobile, ...props } = this.props;
  
    return (!loading ? (
      <div className="container LandingPage">
        <Row>
          <Col xs={12} id="stories" className="stories">
                <Row>
                  <Col xs={12}>
                    <SearchBox
                      searchObject = {this.state.searchObject}
                      updateCallback = {this.updateSearchObject} /> 
                  </Col>
                </Row>
                
                {/* {!this.state.singleActivity
                  ? <Row>
                    <Col xs={12}>
                      <ActivitiesGridWrapper />
                    </Col>
                  </Row>
                  : <Row>
                      <Col xs={12}>
                        <ActivityComponentWrapper
                          activityId={this.state.activityId} />    
                      </Col>
                    </Row>} */}
                
          
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
