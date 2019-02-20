import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import ActivityComponentWrapper from '../../components/ActivityComponent/ActivityComponentWrapper';
import ActivitiesGridWrapper from '../../components/ActivitiesGrid/ActivitiesGridWrapper';
import SearchBox from '../../components/SearchBox/SearchBox';
import i18n from 'meteor/universe:i18n';
import './LandingPage.scss';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityId: '',
      singleActivity: false,
      searchObject: {},
      filterObject: {},
      pageSize: 9,
      pageNum: 0,
    };
  };

  setActivityId = (activityId) => {
    console.log(activityId)
    this.setState({
      ...this.state,
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

  updateFilterObject = () => {
    // search Activities by resetting the state of sub-component
    this.setState({
      filterObject : this.state.searchObject,
      pageNum: 0
    });
  }

  backToActivitiesGrid = () => {
    this.setState({
      singleActivity: false,
    });
  }

  handlePageNumber = (pageNumber) => {
    this.setState({
      pageNum: pageNumber
    });
  }

  render () {
    const { loading, match, history, userId, viewportIsMobile, ...props } = this.props;
  
    return (!loading ? (
      <div className="container LandingPage">
        <Row>
          <Col xs={12} lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
                <Row className="searchBoxHeight">
                  <Col xs={{size: 12, order: 2} } sm={{size: 9, order: 1}} md={8} className="p-md-0">
                    <SearchBox
                      searchCallback = {this.updateFilterObject}
                      updateSearchCallback = {this.updateSearchObject} /> 
                  </Col>
                  <Col xs={{size: 6, offset: 3, order: 1}} sm={{size: 3, offset: 0, order: 2}} md={4} className="p-md-0">
                    <img className="lightBulb" src="/img/ui/lightbulb.png" /> 
                  </Col>
                </Row>
                
                {!this.state.singleActivity
                  ? <Row>
                    <Col xs={12}>
                      <ActivitiesGridWrapper
                        filterObject={this.state.filterObject}
                        pageSize={this.state.pageSize}
                        pageNum={this.state.pageNum}
                        pageNumberCallback={this.handlePageNumber}
                        selectActivityCallback={this.setActivityId} />
                    </Col>
                  </Row>
                  : <Row>
                      <Col xs={12}>
                        <ActivityComponentWrapper
                          backCallback={this.backToActivitiesGrid}
                          activityId={this.state.activityId} />    
                      </Col>
                    </Row>}
                
          
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
