import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import ActivityComponentWrapper from '../../components/ActivityComponent/ActivityComponentWrapper';
import ActivitiesGridWrapper from '../../components/ActivitiesGrid/ActivitiesGridWrapper';
import AboutComponent from '../../components/AboutComponent/AboutComponent';
import ContactComponent from '../../components/ContactComponent/ContactComponent';
import SearchBox from '../../components/SearchBox/SearchBox';
import CategoriesGrid from '../../components/CategoriesGrid/CategoriesGrid';
import './LandingPage.scss';

const ColorRow = styled(Row)`
  background : ${props => props.backcolor || "#777"};
  z-index: -1;
`;
const SearchBoxRow = styled(Row)`
  margin: 5rem 0!important;
  min-height: 300px;
  align-items: center;
`;
const StyledImageDiv = styled.div`
    position: absolute;
    top: ${props => props.isMobile ? "40px" : "50px"};
    left: ${props => props.isMobile ? "27%" : "75%"};
    opacity: ${props => props.isMobile ? "0.7" : "1"};
    z-index: -1;
`;
const StyledImage = styled.img`
  max-width: 100%;
  max-height: ${props => props.isMobile ? "200px" : "280px"};
`;

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityId: '',
      singleActivity: false,
      showCategories: true,
      showAbout: true,
      searchObject: {},
      filterObject: {},
      pageSize: 9,
      pageNum: 0,
    };
  };
  /**
   * This is a non-Reacty hack. An event listener is attached to another component (Navigation) in the DOM.
   * This is needed, as otherwise the entire LandingPage state management would have to be moved to App.js.
   * This would be handled more elegantly with redux.
   */
  componentDidMount () {
    const homepageLink = document.getElementsByClassName('navbar-brand')[0];
    homepageLink.addEventListener('click', this.backToLanding);
  }
  componentWillUnmount () {
    const homepageLink = document.getElementsByClassName('navbar-brand')[0];
    homepageLink.addEventListener('click', this.backToLanding);
  }

  setActivityId = (activityId) => {
    this.setState({
      ...this.state,
      activityId: activityId,
      singleActivity: true,
      showAbout: false,
    });
  }

  // update the searchObject - does not run search
  updateSearchObject = (key, value) => {
    
    // if user selects all age show children, adult and all age options
    // if user selects more than one category, show all
    if(key === 'age' && (value.indexOf('ageall') > -1  || value.length > 1)) {
      value = ['agech', 'agead', 'ageall'];
    }
    
    this.setState({
        searchObject : {
            ...this.state.searchObject,
            [key]: value
        },
        singleActivity : false,
        showCategories: false,
        showAbout: false,
    });
  }

  // search Activities by resetting the state of sub-component
  updateFilterObject = () => {
    this.setState({
      filterObject : this.state.searchObject,
      pageNum: 0,
      showCategories: false,
      showAbout: false,
    });
  }

  backToActivitiesGrid = () => {
    this.setState({
      singleActivity: false,
      showCategories: false,
      showAbout: false,
    });
  }

  backToCategoriesGrid = (category) => {
    this.setState({
      singleActivity: false,
      showCategories: true,
      showAbout: false,
      category: category
    })
  }

  backToLanding = () => {
    this.setState({
      singleActivity: false,
      showCategories: true,
      showAbout: true
    })
  }

  handlePageNumber = (pageNumber) => {
    this.setState({
      pageNum: pageNumber
    });
  }

  render () {
    const { loading, isMobile, ...props } = this.props;
  
    return (!loading ? (
      <div className="LandingPage">
        <div className="container">
          <Row>
            <Col className="px-5 px-md-0" xs={12} lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
              <SearchBoxRow>
                <Col className="pl-0" xs={{size: 12, order: 2} } sm={{size: 9, order: 1}} md={8}>
                  <SearchBox
                    searchCallback = {this.updateFilterObject}
                    updateSearchCallback = {this.updateSearchObject} /> 
                </Col>
                <StyledImageDiv isMobile={isMobile}>
                  <StyledImage isMobile={isMobile} src="/img/ui/lightbulb.png" /> 
                </StyledImageDiv>
              </SearchBoxRow>
              {this.state.showCategories ? 
                <CategoriesGrid {...props} callback={this.backToCategoriesGrid}/> 
              : ''}
              {!this.state.showCategories && !this.state.singleActivity
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
                : ''}
                {!this.state.showCategories && this.state.singleActivity ? 
                  <Row>
                    <Col xs={12}>
                      <ActivityComponentWrapper
                        isMobile={isMobile}
                        backCallback={this.backToActivitiesGrid}
                        activityId={this.state.activityId}
                        {...props} />    
                    </Col>
                  </Row>
                : ''}
            </Col>
            {this.state.showAbout 
              ? <Col className="px-5 px-sm-0" xs={12} lg={{size: 10, offset: 2}} xl={{size: 8, offset: 4}}>
                  <AboutComponent isMobile={isMobile} />
                </Col>
              : ''}
            </Row>
        </div>
        <div className="container-fluid">
          <ColorRow backcolor={"#D2FF9D"}>
            <Col className="px-4 px-sm-0" xs={12} lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
                <ContactComponent isMobile={isMobile} />
            </Col>
          </ColorRow>
        </div>
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
  isMobile: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const userId = Meteor.userId();
  return {
    loading: false,
    userId,
  };
})(LandingPage);
