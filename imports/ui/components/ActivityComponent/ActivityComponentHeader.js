import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import LikesComponent from '../LikesComponent/LikesComponent';
import { BasicStyledLink, BasicStyledBadge } from '../MainStyledComponents/MainStyledComponents';
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
const CategoryLink = styled(BasicStyledLink)`
    padding: 0 0 1rem 0;
    &:hover {
        text-decoration: none;
    }
`;
const StyledBadge = styled(BasicStyledBadge)`
    text-transform: uppercase;
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
            <StyledBadge 
                color={color}
                backcolor={'#ffffff'}
                key={tagIndex}
                >
                {i18n.__(`tags.${tagIndex}`)}
            </StyledBadge>
        );

    }
    render() {
        const { activity, locale, backCallback, isMobile, ...props } = this.props;
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
                        <CategoryLink 
                            backcolor={color}
                            color={'#ffffff'}
                            href={"/category/" + category}>
                            {categoryName}
                            </CategoryLink>
                    </StyledHeaderContainer>
                    <RightStyledContainer 
                        xs={{size: 12, order: 1}} sm={{size: 4, order: 2}}
                        backcolor={color}
                        >
                         <LikesComponent
                            color={color}
                            backcolor={'#ffffff'}
                            activity={activity}
                            user={props.user}
                            emailAddress={props.emailAddress} />
                        <BasicStyledLink 
                            backcolor={color}
                            color={'#ffffff'}
                            onClick={backCallback}
                            href="#">
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            {` Back${!isMobile ? ' to results' : ''}`}
                        </BasicStyledLink>
                    </RightStyledContainer>
                    <StyledTagContainer
                        xs={{size: 12, order: 3}}
                        backcolor={color}>
                        {this.renderTags({activity, locale, color})}
                    </StyledTagContainer>
                    {/* <StyledTagContainer 
                        xs={{size: 3, order: 4}}
                        backcolor={color}>
                        <LikesComponent
                            color={color}
                            backcolor={'#ffffff'}
                            activity={activity}
                            user={props.user}
                            emailAddress={props.emailAddress} />
                    </StyledTagContainer> */}
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
    user: PropTypes.object.isRequired,
};


export default ActivityComponentHeader;