import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Badge } from 'reactstrap';
import './EditorActivityHeader.scss';
import { getCategoryName, getCategoryArray } from '../../../modules/get-category-name';

class EditorActivityHeader extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          activity : this.props.activity,
      }
    }

    // setBackground = (color) => {
    //     return {
    //         background : color
    //     }
    // }

    renderTags = ({activity, color}) => {
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
        const { activity } = this.props;
        const language = 'en-US';
        const category = activity.category;
        const color = category ? getColorByCategory(category) : '#cccccc';
        const categoryName = category ? getCategoryName(category) : 'No category set';
        const allCategoriesArray = getCategoryArray();
        return (
            <div className="EditorActivityHeader">
                <Row>
                    <Col sm="6" style={this.setBackground(color)}>
                        <h2 className="activityTitle">{activity.title[`title.${language}`] || 'Click here to add a title'}</h2>
                        <span className="activityCategory">{categoryName}</span>
                        <br/>
                        {this.renderTags({activity, color})}
                    </Col>
                    <Col sm="6" className="text-right pt-3" style={this.setBackground(color)}>
                        <a href="#" className="backLink">
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            Back to search results 
                        </a>
                    </Col>
                </Row>
            </div>
        )
    }
}

EditorActivityHeader.defaultProps = {
    
  };
  
EditorActivityHeader.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};


export default EditorActivityHeader;