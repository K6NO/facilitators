import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import createTranslation from '../../../modules/create-translation';

class SearchBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        detailed: false,
        searchObject: {}
    }
  }

  updateSearchObject = (key, value) => {
      this.setState({
          searchObject : {
              ...this.state.searchObject,
              [key]: value
          }
      });
  }

  searchActivities = () => {
    // subscribe to results in ActivitiesGridContainer with searchObject filter
  }

  render () {
    
    const searchTitle = createTranslation('searchbox.title');
    return ( 
      <div className="SearchBox">
        <Row>
            <Col>
                <h1 className="searchTitle">{searchTitle}</h1>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="6">
                Category, Group, Age, Time
            </Col>
        </Row>
        {this.state.detailed 
            ? <Row>
                <Col>
                    Detailed search row    
                </Col>
            </Row>
        : ''}
        
        <Row>
            <Col>
                Button row
            </Col>
        </Row>
      </div>
    );
  }
}
SearchBox.propTypes = {
    searchObject : PropTypes.object.isRequired,
    updateCallback : PropTypes.func.isRequired
};

export default SearchBox;