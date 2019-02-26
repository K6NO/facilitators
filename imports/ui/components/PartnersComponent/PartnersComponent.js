import React from 'react';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import PartnerCard from './PartnerCard';
import SponsorCard from './SponsorCard';
import { Col, Row } from 'reactstrap';

import { getOrganisations, getSponsors } from '../../../modules/get-select-translations';

const StyledPartnersComponent = styled(Row)`
    margin-top: 5rem;
    margin-bottom: 5rem;
    text-align: center;
`;
const StyledTitle = styled.h1`
    margin-bottom: 5rem;
    text-align: center;
    color: #0e8ed5;
    text-transform: uppercase;
    letter-spacing: 3px;
`;
const StyledTitleSponsor = styled(StyledTitle)`
    margin-top: 5rem;
`;
const StyledImageDiv = styled.div`
    position: absolute;
    bottom: ${props => props.isMobile ? "200px" : "100px"};
    left: ${props => props.isMobile ? "100px" : "-120px"};
    opacity: ${props => props.isMobile ? "0.4" : "0.4"};
`;
const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 250px;
`;


class PartnersComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        const { isMobile } = this.props;
        const partners = getOrganisations();
        const sponsors = getSponsors();
        return (
            <StyledPartnersComponent>
                <Col className="align-self-end">
                    <StyledTitle>{i18n.__('about.organisations')}</StyledTitle>
                </Col>
                <Col xs={12}>
                    {partners.map(p => 
                        <PartnerCard key={p.name} p={p} isMobile={isMobile} />
                    )}
                </Col>
                <Col>
                    <StyledTitleSponsor>{i18n.__('about.sponsor')}</StyledTitleSponsor>
                </Col>
                <Col xs={12} >
                    {sponsors.map(s => 
                        <SponsorCard key={s.name} s={s} isMobile={isMobile} />
                    )}
                </Col>
                <StyledImageDiv isMobile={isMobile}>
                    <StyledImage src="/img/ui/orgs.png" alt="Organisations illustration"/>
                </StyledImageDiv>  
   
            </StyledPartnersComponent>
        )
    }
}


export default PartnersComponent;
