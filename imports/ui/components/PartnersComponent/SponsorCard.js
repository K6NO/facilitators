import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import styled from 'styled-components';

const StyledCard = styled(Col)`
    height: 100px;
`;
const StyledTextDiv = styled.div`
    background: #ffffffaa;
    color: #777;
    padding: .5rem;
    font-size: 1.3rem;
`;
const StyledImage = styled.img`
    width: auto;
    height: 100px;
    border-radius: 5px;
`;


class SponsorCard extends React.Component {
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
        const { s } = this.props;
        return (
            <StyledCard 
                xs={12} 
                className="px-0" 
                >
                <div>
                    <a href={s.url}>
                        <StyledImage src={s.logo} alt={`Picture of ${s.name}`}/>
                    </a>
                </div>
                
                <StyledTextDiv>{s.text}</StyledTextDiv>
            </StyledCard>
        )
    }
}

SponsorCard.propTypes = {
    s: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired
  };
export default SponsorCard;