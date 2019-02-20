import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { Row, Col, Badge } from 'reactstrap';
import { getColorByCategory } from '../../../modules/get-colors';
import { getCategoryName } from '../../../modules/get-select-translations';
import getLocale from '../../../modules/get-locale';

const StyledPreviewComponentHeader = styled.div`
    color : ${props => props.textColor || "white"};
    background: transparent;
`;
const CategoryLink = styled.a`
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${props => props.textColor || "#777777"};
    &:hover {
        text-decoration: none;
    }
`;

const Title = styled.h2`
    height: 65px;
    font-weight: 100;
`

class ActivityPreviewComponentHeader extends React.Component {
    constructor(props){
      super(props);
    }

    setBackground = (color) => {
        return {
            background : color
        }
    }

    render() {
        const { activity } = this.props;
        const locale = getLocale();
        const category = activity.category;
        const color = getColorByCategory(category);
        const categoryName = getCategoryName(category);
        return (
            <StyledPreviewComponentHeader textColor={color}>
                <Title>{activity.title[locale]}</Title>
                <CategoryLink 
                    href={"/category/" + activity.category}
                    textColor={color}>
                    {categoryName}</CategoryLink>
            </StyledPreviewComponentHeader>
        )
    }
}

ActivityPreviewComponentHeader.defaultProps = {
    
  };
  
ActivityPreviewComponentHeader.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityPreviewComponentHeader;