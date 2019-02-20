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
`;
const CategoryLink = styled.a`
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 100;
    color: white;
    &:hover {
        text-decoration: none;
        color: #ededed;
    }
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

    renderTags = ({activity, locale, color}) => {
        return activity.tags.map((tagIndex) =>   
            <Badge 
                color="light" 
                pill
                key={tagIndex}
                className="tagPills"
                style={{color: color}}
                >
                {i18n.__(`tags.${tagIndex}`)}
            </Badge>
        );

    }
    render() {
        const { activity, locale, backCallback} = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        const categoryName = getCategoryName(category);
        const isMobile = window.innerWidth < 500;
        return (
            <div className="ActivityComponentHeader">
                <Row>
                    <Col xs="9" sm="8" style={this.setBackground(color)}>
                        <ActivityTitle>{activity.title[locale]}</ActivityTitle>
                        <CategoryLink href={"/category/" + category}>{categoryName}</CategoryLink>
                        <br/>
                        {this.renderTags({activity, locale, color})}
                    </Col>
                    <Col xs="3" sm="4" className="text-right pt-3" style={this.setBackground(color)}>
                        <Button color='link' onClick={backCallback} className="backLink">
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            {` Back${!isMobile ? 'to search results' : ''}`}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

ActivityComponentHeader.defaultProps = {
    
  };
  
ActivityComponentHeader.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    backCallback: PropTypes.func.isRequired
};


export default ActivityComponentHeader;