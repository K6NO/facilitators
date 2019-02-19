import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import MultiSelector from '../MultiSelector/MultiSelector';
import SearchButton from './SearchButton';
import { getSearchBoxValues, getDetailedSearchBoxValues } from './getSearchBoxValues';
import DetailedSearchButton from './DetailedSearchButton';

class SearchBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        detailed: false,
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
                options={boxValue.options}
                custom={false} />
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
                options={boxValue.options}
                custom={true} />
        </Col>
    )
    
    switchDetailedSearch = () => {
        this.setState({
            detailed: !this.state.detailed
        });
    }
    
    render () {
        const { updateSearchCallback, searchCallback } = this.props;
    
   
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
                    <SearchButton
                        searchCallback={searchCallback} />
                    <DetailedSearchButton 
                        detailed={this.state.detailed}
                        callback={this.switchDetailedSearch} />
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