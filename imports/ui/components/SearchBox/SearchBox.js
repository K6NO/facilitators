import React from 'react';
import PropTypes from 'prop-types';
import MultiSelector from '../MultiSelector/MultiSelector';
import { Row, Col } from 'reactstrap';
import { getMultiCategoryArray, getMultiTimeArray, getMultiGroupArray, getMultiAgeArray } from '../../../modules/get-category-name';


class SearchBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        detailed: false,
    }
  }





  render () {
      const { updateSearchCallback } = this.props;
    
    return ( 
      <div className="SearchBox">
        <Row>
            <Col>
                <h1 className="searchTitle">{i18n.__('searchbox.title')}</h1>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="6">
                <MultiSelector 
                    updateSearchCallback={updateSearchCallback}
                    className={"CategoryMultiSelector"}
                    name={"category"}
                    noSelectionLabel={i18n.__('searchbox.categoryDefault')}
                    ariaLabel={"Search by category. Use up and down arrows to navigate categories. Hit enter to select."}                  
                    options={getMultiCategoryArray()} />
            </Col>
            <Col xs="12" sm="6">
                <MultiSelector 
                    updateSearchCallback={updateSearchCallback}
                    className={"GroupMultiSelector"}
                    name={"group"}
                    noSelectionLabel={i18n.__('searchbox.groupDefault')}
                    ariaLabel={"Search by group. Use up and down arrows to navigate group sizes. Hit enter to select."}                  
                    options={getMultiGroupArray()} />
            </Col>
            <Col xs="12" sm="6">
                <MultiSelector 
                    updateSearchCallback={updateSearchCallback}
                    className={"AgeMultiSelector"}
                    name={"age"}
                    noSelectionLabel={i18n.__('searchbox.ageDefault')}
                    ariaLabel={"Search by age. Use up and down arrows to navigate age groups. Hit enter to select."}                  
                    options={getMultiAgeArray()} />
            </Col>
            <Col xs="12" sm="6">
                <MultiSelector 
                    updateSearchCallback={updateSearchCallback}
                    className={"AgeMultiSelector"}
                    name={"age"}
                    noSelectionLabel={i18n.__('searchbox.ageDefault')}
                    ariaLabel={"Search by age. Use up and down arrows to navigate age groups. Hit enter to select."}                  
                    options={getMultiTimeArray()} />
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
    updateSearchCallback : PropTypes.func.isRequired
};

export default SearchBox;