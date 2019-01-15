import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import setLocale from '../../../modules/set-locale';
import { Row, Col, Table, FormGroup } from 'reactstrap';

import './ActivityComponent.scss';

class ActivityComponentFooter extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { category } = this.props;
        const locale = getLocale();
        const categoryName = i18n.__('landart');
        console.log(categoryName);
        const color = getColorByCategory(categoryName);
        console.log(color);
        return (
            <div className="ActivityComponentFooter">
                Change bg style based on category.
            </div>
        )
    }
}

ActivityComponentFooter.defaultProps = {
    
  };
  
  ActivityComponentFooter.propTypes = {
    category: PropTypes.string,
};


export default ActivityComponentFooter;