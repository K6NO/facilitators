import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Table, FormGroup } from 'reactstrap';

import './ActivityComponentFooter.scss';

class ActivityComponentFooter extends React.Component {
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
        return (
            <div className="ActivityComponentFooter"
                style={this.setBackground(color)}>
                <Row>
                    <Col className="text-right pt-3 pb-5"
                    style={this.setBackground(color)}>
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

ActivityComponentFooter.defaultProps = {
    
};
  
ActivityComponentFooter.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};


export default ActivityComponentFooter;