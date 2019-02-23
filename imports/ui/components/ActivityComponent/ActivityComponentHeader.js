import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { Row, Col, Badge, Button } from 'reactstrap';
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
    background: ${props => props.backcolor || "#777777"};
    border-radius: 10px 10px 0 0;
`;
const StyledHeaderContainer = styled(Col)`
    background: ${props => props.backcolor || "#777777"};
    border-radius: ${props => props.ismobile ? "0" : "10px 10px 0 0"};
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
    padding-left: 1.5rem!important;
`;
const RightStyledContainer = styled(StyledHeaderContainer)`
    text-align: right;
`;
const StyledTagContainer = styled(Col)`
    padding-bottom: 1rem!important;
    background: ${props => props.backcolor || "#777777"};
    box-shadow: #333 0 3px 1px -2px;
`;
const StyledPill = styled.span`
        background-color: #f8f9fa;
        margin: 1rem 1rem 1rem 0;
        padding: .5rem 1rem;
        min-width: 10px;
        white-space: nowrap;
        vertical-align: baseline;
        text-align: center;
        text-transform: uppercase;
        font-size: 1rem;
        border-radius: 10rem;
        font-family: Open, sans-serif;
        color: ${props => props.inputColor || "darkslategray"};
`;
const StyledBackLink = styled(Button)`
    color: white!important;
    font-size: 1.4rem!important;
    letter-spacing: 1.5px!important;
    font-weight: 100!important;
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
            <StyledContainer backcolor={color}>
                <Row>
                    <StyledHeaderContainer
                        backcolor={color}
                        ismobile={isMobile}
                        xs={{size: 12, order: 2}} sm={{size: 8, order: 1}}>
                        <ActivityTitle>{activity.title[locale]}</ActivityTitle>
                        <CategoryLink href={"/category/" + category}>{categoryName}</CategoryLink>
                    </StyledHeaderContainer>
                    <RightStyledContainer 
                        xs={{size: 12, order: 1}} sm={{size: 4, order: 2}}
                        backcolor={color}
                        >
                        <StyledBackLink 
                            color='link' 
                            onClick={backCallback}>
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            {` Back${!isMobile ? ' to search results' : ''}`}
                        </StyledBackLink>
                    </RightStyledContainer>
                    <StyledTagContainer
                        xs={{size: 12, order: 3}}
                        backcolor={color}>
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