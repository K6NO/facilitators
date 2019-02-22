import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledCard = styled(Col)`
    box-shadow: 0 1px 1px 0 #cccccc;
    height: 150px;
`;
const StyledOverlayDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: #ffffffaa;
    color: #777;
    padding: .5rem;
    height: 140px;
    font-size: 1.3rem;
`;
const StyledImage = styled.img`
    width: 65px;
    height: 65px;
    border-radius: 5rem;
`;

const StyledName = styled.p`
    letter-spacing: .5px;
    font-weight: 100;
    color: #333;
    font-size: 1.6rem;
    padding-top: 3rem;
`;
const StyledOrg = styled.p`
    letter-spacing: .5px;
    font-weight: 100;
    color: #777;
    font-size: 1.3rem;
`;

class ContributorsCard extends React.Component {
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
        const { c } = this.props;
        return (
            <StyledCard 
                xs={6} sm={4} md={2} 
                className="px-0 text-center" 
                onMouseEnter={this.switchHover}
                onMouseLeave={this.switchHover}>
                <div>
                    <StyledImage src={c.url} alt={`Picture of ${c.name}`}/>
                    <StyledName>{c.name}</StyledName>
                    <StyledOrg>{c.organisation}</StyledOrg>
                </div>
                
                {this.state.hover ? <StyledOverlayDiv>{c.text}</StyledOverlayDiv> : ''}
            </StyledCard>
        )
    }
}

ContributorsCard.propTypes = {
    c: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired
  };
export default ContributorsCard;