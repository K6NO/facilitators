import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Badge } from 'reactstrap';
import './ActivityComponentHeader.scss';
import getLocale from '../../../modules/get-locale';
import { getCategoryName } from '../../../modules/get-category-name';

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
        const { activity, locale } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        const categoryName = getCategoryName(category);
        return (
            <div className="ActivityComponentHeader">
                <Row>
                    <Col sm="6" style={this.setBackground(color)}>
                        <h2 className="activityTitle">{activity.title[`title.${locale}`]}</h2>
                        <a className="activityCategory">{categoryName}</a>
                        <br/>
                        {/* for each number in the tags array find the corresponding tag in the i18 file and render */}
                        {this.renderTags({activity, locale, color})}
                    </Col>
                    <Col sm="6" className="text-right pt-3" style={this.setBackground(color)}>
                        <span className="backLink">
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            Back to search results 
                        </span>
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
};


export default ActivityComponentHeader;