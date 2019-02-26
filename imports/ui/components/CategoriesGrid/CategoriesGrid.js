import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import Icon from '../Icon/Icon';
import { getCategoriesGrid, getCategory } from '../../../modules/get-select-translations';

const StyledButton = styled.button`
        text-transform: uppercase;
        font-size: inherit;
        font-weight: 100;
        font-family: inherit;
        border: 1px solid transparent;
        background: transparent;
        color: #0e8ed5;
        &:hover {
            text-decoration: none;
        }
`;
const StyledText = styled.p`
    letter-spacing: .8px;
    line-height: 1.5;
    font-size: 1.4rem;
    padding: 1.5rem 1.5rem 0 0;
`;
const StyledTitle = styled.h2`
    text-align: center;
    margin-top: 2rem;    
    `
const LargeTitle = styled(StyledTitle)`
    color: #0e8ed5;
    font-size: 3.6rem;
`;

const StyledImage = styled.img`
    width : 100%;
    max-width : 450px;
`;

class CategoriesGrid extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          single: false
      }   
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            single: this.props.category.value.length > 0 ? true : false
        });
    }

    handleSetCategory = (category) => {
        this.props.history.push('/category/' + category.value);
        this.setState({
            single: true,
            category: category
        });
    }
    handleResetCategory = () => {
        this.props.history.push('/');

        this.setState({
            single: false,
            category: {
                value: ''
            }
        });
    }

    renderCategory = (category) => 
        (
            <Col xs={12}
                key={category.value}
                className="p-md-0 text-center">
                <div>
                    <LargeTitle>
                        {i18n.__(`categories.${category.value}`)}
                    </LargeTitle>
                </div>
                <div>
                    <StyledImage src={category.imageUrl} />
                </div>
                <div>
                    <StyledText>{i18n.__(`categoryDescriptions.${category.value}`)}</StyledText>
                    <StyledTitle>
                        <StyledButton onClick={this.handleResetCategory}><Icon icon={'chevron-left'} /> Back</StyledButton>
                    </StyledTitle>
                </div>
            </Col>
        );

    renderCategories = () => getCategoriesGrid().map(category => (
        <Col xs={12} sm={6} md={4}
            key={category.value}
            className="p-md-0">
            <div>
                <StyledTitle>
                    <StyledButton onClick={() => this.handleSetCategory(category)}>{category.text}</StyledButton>
                </StyledTitle>
            </div>
            <div>
                <img style={{width : '100%', maxWidth : '450px'}} src={category.imageUrl} />
            </div>
        </Col>

    ))

    render() {
    const {category} = this.props;
    return (
            <div className="CategoriesGrid">
                <Row>
                    {category && category.value.length > 0
                        ? this.renderCategory(category)    
                        : this.renderCategories()}
                </Row>
            </div>
        )   
    }
}
  
CategoriesGrid.propTypes = {
    category: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withTracker(({match}) => {
    const category = match.params.cat 
    ? getCategory(match.params.cat)
    : {
        value: ''
    }
    return {
        category
    }
})(CategoriesGrid);