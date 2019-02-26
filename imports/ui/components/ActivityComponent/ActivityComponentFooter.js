import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import { BasicStyledLink } from '../MainStyledComponents/MainStyledComponents';

const StyledTagContainer = styled(Col)`
    padding: 2rem 0;
    text-align: center;
`;

class ActivityComponentFooter extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
        const { activity, isMobile, backCallback } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <Row>
                <StyledTagContainer>
                    <BasicStyledLink
                        color={color}
                        href="#"
                        onClick={backCallback}
                        >
                        <Icon icon={'angle-double-left'} size={'lg'}/>
                        {` Back${!isMobile ? ' to results' : ''}`}
                    </BasicStyledLink>
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
    isMobile: PropTypes.bool.isRequired,
    backCallback: PropTypes.func.isRequired,
};


export default ActivityComponentFooter;