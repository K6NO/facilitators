import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';

import './ActivityComponentFooter.scss';

const StyledTagContainer = styled(Col)`
    padding-bottom: 1rem!important;
    background: ${props => props.backcolor || "#777777"};
    box-shadow: #333 0 3px 1px -2px;
`;
const StyledBackLink = styled.a`
    color: white!important;
    font-size: 1.4rem!important;
    letter-spacing: 1.5px!important;
    font-weight: 100!important;
`;

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
        const { activity, isMobile } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <Row>
                <StyledTagContainer 
                    backcolor={color}>
                    <Row>
                        <Col className="text-right pt-3 pb-5"
                        style={this.setBackground(color)}>
                            <StyledBackLink href="#">
                                <Icon icon={'angle-double-left'} size={'lg'}/>
                                {` Back${!isMobile ? ' to search results' : ''}`}
                            </StyledBackLink>
                        </Col>
                    </Row>
                </StyledTagContainer>
            </Row>
        )
    }
}

ActivityComponentFooter.defaultProps = {
    
};
  
ActivityComponentFooter.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired
};


export default ActivityComponentFooter;