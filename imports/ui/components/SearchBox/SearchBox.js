import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import MultiSelector from '../MultiSelector/MultiSelector';
import SearchButton from './SearchButton';
import { getSearchBoxValues, getDetailedSearchBoxValues } from './getSearchBoxValues';
import DetailedSearchButton from './DetailedSearchButton';

import styled from 'styled-components';

const SearchTitle = styled.h1`
        color: #0e8ed5;
        text-transform: uppercase;
        letter-spacing: 3px;
`;

class SearchBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        detailed: false,
    }
  }
    /**
     * Render fields for normal search
     */
    renderSearchBoxValues = (updateSearchCallback) => getSearchBoxValues().map(boxValue => 
        <Col xs={12} sm={6} key={boxValue.name} className="py-2 pr-0">
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
    /**
     * Render fields for detailed search
     */
    renderDetailedSearchBoxValues = (updateSearchCallback) => getDetailedSearchBoxValues().map(boxValue => 
        <Col xs={12} key={boxValue.name} className="py-2 pr-0">
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
    
    /**
     * Switches between normal and detailed search
     */
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
                    <SearchTitle>{i18n.__('searchbox.title')}</SearchTitle>
                </Col>
            </Row>
            <Row className="mt-2">
                {this.renderSearchBoxValues(updateSearchCallback)}
            </Row>
            {this.state.detailed 
                ? <Row>
                    {this.renderDetailedSearchBoxValues(updateSearchCallback)}
                </Row>
                : ''}
            <Row >
                <Col className="mt-2 text-right">
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
    updateSearchCallback : PropTypes.func.isRequired,
    searchCallback : PropTypes.func.isRequired
};

export default SearchBox;