import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import styled  from 'styled-components';
import './ActivityComponent.scss';

const StyledComponent = styled.div`
    margin: ${props => props.isMobile ? "0" : ".5rem"};
    background-image: ${props => props.url 
        ? props.isMobile 
            ? `url("${props.url.replace('original', 'mobile')}")`
            : `url("${props.url}")`
        : "https://via.placeholder.com/400x300.jpg"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: ${props => props.isMobile ? '260px' : '140px'};
`;

class ActivityImagesComponent extends React.Component {
    constructor(props){
      super(props);
    }

    render () {
        const { url, isMobile } = this.props;
        return (
            <Col sm="6 px-0 py-2 py-sm-0" >
                <StyledComponent isMobile={isMobile} url={url} />
            </Col>
        )
    }
}

ActivityImagesComponent.defaultProps = {
    
};
  
ActivityImagesComponent.propTypes = {
    url: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired
};


export default ActivityImagesComponent;
