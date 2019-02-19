import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { Row, Col, Badge } from 'reactstrap';
import { getColorByCategory } from '../../../modules/get-colors';
import { getCategoryName } from '../../../modules/get-select-translations';

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
        const { activity, locale } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        const categoryName = getCategoryName(category);
        return (
            <div className="ActivityPreviewComponentHeader">
                <h2 className="activityTitle">{activity.title[`title.${locale}`]}</h2>
                <a className="activityCategory">{categoryName}</a>
            </div>
        )
    }
}

ActivityPreviewComponentHeader.defaultProps = {
    
  };
  
ActivityPreviewComponentHeader.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};


export default ActivityPreviewComponentHeader;