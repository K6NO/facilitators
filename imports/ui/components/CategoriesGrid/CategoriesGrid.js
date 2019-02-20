import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { getCategoriesGrid } from '../../../modules/get-select-translations';

class CategoriesGrid extends React.Component {
    constructor(props){
      super(props);
      
    }

    renderCategories = () => getCategoriesGrid().map(category => (
        <Col xs={12} sm={6} md={4}
            key={category.value}
            className="p-md-0">
            <div>
                <h2><a href={"/category/" + category.value}>{category.text}</a></h2>
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
