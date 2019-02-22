import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { getCategoriesGrid } from '../../../modules/get-select-translations';

const StyledLink = styled.a`
        text-transform: uppercase;
        font-size: inherit;
        font-weight: 100;
        font-family: inherit;
        color: #0e8ed5;
        &:hover {
            text-decoration: none;
        }
    `
const StyledTitle = styled.h2`
    text-align: center;
    margin-top: 2rem;    
    `
class CategoriesGrid extends React.Component {
    constructor(props){
      super(props);
      
    }

    

    renderCategories = () => getCategoriesGrid().map(category => (
        <Col xs={12} sm={6} md={4}
            key={category.value}
            className="p-md-0">
            <div>
                <StyledTitle>
                    <StyledLink href={"/category/" + category.value}>{category.text}</StyledLink>
                </StyledTitle>
            </div>
            <div>
                <img style={{width : '100%', maxWidth : '300px'}} src={category.imageUrl} />
            </div>
        </Col>

    ))

    render() {
        return (
            <div className="CategoriesGrid">
                <Row>
                    {this.renderCategories()}
                </Row>
            </div>
        )   
    }
}

CategoriesGrid.defaultProps = {
    
};
  
CategoriesGrid.propTypes = {

};


export default CategoriesGrid;
