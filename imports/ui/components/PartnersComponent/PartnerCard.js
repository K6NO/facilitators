import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import styled from 'styled-components';

const StyledOverlayDiv = styled.div`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    z-index: 10;
    background: #ffffff;
    border: 1px solid #777;
    color: #777;
    padding: .5rem;
    font-size: 1.3rem;
`;
const StyledImageDiv = styled.div`
    width: 100%;
    height: 120px;
    background-image: ${props => props.bgImage ? `url('${props.bgImage}')` : "https://via.placeholder.com/400x300.jpg"};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
`;


class PartnerCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hover: false,
      };
    };
    switchHover = () => {
        this.setState({
            hover: !this.state.hover
        });
    }
    render () {
        const { p } = this.props;
        return (
            <Col 
                xs={6} sm={6} md={6} 
                className="px-0 text-center" 
                onMouseEnter={this.switchHover}
                onMouseLeave={this.switchHover}>
                <div>
                    <a href={p.url}><StyledImageDiv bgImage={p.logo}></StyledImageDiv></a>
                </div>
                
                {this.state.hover ? <StyledOverlayDiv>{p.text}</StyledOverlayDiv> : ''}
            </Col>
        )
    }
}

PartnerCard.propTypes = {
    p: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired
  };
export default PartnerCard;