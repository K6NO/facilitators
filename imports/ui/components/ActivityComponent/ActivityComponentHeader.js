import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { Row, Col, Badge, Button } from 'reactstrap';
import './ActivityComponentHeader.scss';
import { getColorByCategory } from '../../../modules/get-colors';
import { getCategoryName } from '../../../modules/get-select-translations';

const ActivityTitle = styled.h2`
    margin: 0;
    padding: 1rem 0 0;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 100;
    min-height: 65px;
`;
const CategoryLink = styled.a`
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.3rem;
    font-weight: 100;
    color: white;
    padding: 0 0 1rem 0;

    &:hover {
        text-decoration: none;
        color: #cccccc;
    }
`;

const StyledContainer = styled.div`
    background: ${props => props.backColor || "#777777"};
`;
const StyledTagContainer = styled(Col)`
    padding-bottom: 1rem!important;
    background: ${props => props.backColor || "#777777"};
`
const StyledPill = styled.span`
        background-color: #f8f9fa;
        margin: 1rem 1rem 1rem 0;
        padding: .5rem 1rem;
        min-width: 10px;
        border-radius: 0rem;
        white-space: nowrap;
        vertical-align: baseline;
        text-align: center;
        text-transform: uppercase;
        font-size: 1rem;
        border-radius: 10rem;
        font-family: Open, sans-serif;
        color: ${props => props.inputColor || "darkslategray"};
        `;
class ActivityComponentHeader extends React.Component {
    constructor(props){
      super(props);
    }

    setBackground = (color) => {
        return {
            background : color
        }
    }

    renderTags = ({activity, color}) => {
        console.log({color})
        return activity.tags.map((tagIndex) =>   
            <StyledPill 
                color="light" 
                pill
                key={tagIndex}
                inputColor={color}>
                {i18n.__(`tags.${tagIndex}`)}
            </StyledPill>
        );

    }
    render() {
        const { activity, locale, backCallback, isMobile } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        const categoryName = getCategoryName(category);
        
        return (
            <StyledContainer className="ActivityComponentHeader">
                <Row>
                    <Col className="pb-3" xs={{size: 12, order: 2}} sm={{size: 8, order: 1}} style={this.setBackground(color)}>
                        <ActivityTitle>{activity.title[locale]}</ActivityTitle>
                        <CategoryLink href={"/category/" + category}>{categoryName}</CategoryLink>
                    </Col>
                    <Col xs={{size: 12, order: 1}} sm={{size: 4, order: 2}} className="text-right pt-3 pl-0 pl-md-5" style={this.setBackground(color)}>
                        <Button color='link' onClick={backCallback} className="backLink">
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            {` Back${!isMobile ? ' to search results' : ''}`}
                        </Button>
                    </Col>
                    <StyledTagContainer
                        xs={{size: 12, order: 3}}
                        backColor={color}>
                        {this.renderTags({activity, locale, color})}
                    </StyledTagContainer>
                </Row>
            </StyledContainer>
        )
    }
}

ActivityComponentHeader.defaultProps = {
    
  };
  
ActivityComponentHeader.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    backCallback: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
};


export default ActivityComponentHeader;