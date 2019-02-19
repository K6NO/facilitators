import React from 'react';
import PropTypes from 'prop-types';
import MultiSelector from '../MultiSelector/MultiSelector';
import { Row, Col, Button } from 'reactstrap';
import { getSearchBoxValues, getDetailedSearchBoxValues } from './getSearchBoxValues';

class SearchBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        detailed: true,
    }
  }

    renderSearchBoxValues = (updateSearchCallback) => getSearchBoxValues().map(boxValue => 
        <Col xs={12} sm={6} key={boxValue.name}>
            <MultiSelector
                updateSearchCallback={updateSearchCallback}
                className={boxValue.className}
                name={boxValue.name}
                noSelectionLabel={i18n.__(boxValue.noSelectionLabel)}
                ariaLabel={boxValue.ariaLabel}
                options={boxValue.options} />
        </Col>
        )

    renderDetailedSearchBoxValues = (updateSearchCallback) => getDetailedSearchBoxValues().map(boxValue => 
        <Col xs={12} key={boxValue.name}>
            <MultiSelector
                updateSearchCallback={updateSearchCallback}
                className={boxValue.className}
                name={boxValue.name}
                noSelectionLabel={i18n.__(boxValue.noSelectionLabel)}
                ariaLabel={boxValue.ariaLabel}
                options={boxValue.options} />
        </Col>
        )
    
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
            {this.renderSearchBoxValues(updateSearchCallback)}
        </Row>
        {this.state.detailed 
            ? <Row>
                {this.renderDetailedSearchBoxValues(updateSearchCallback)}
            </Row>
        : ''}
        
        <Row>
            <Col>
                <Button color="primary">{i18n.__('searchbox.searchBtn')}</Button>
                <Button color="link">{i18n.__('searchbox.detailedBtn')}</Button>
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