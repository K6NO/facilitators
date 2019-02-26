import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import ContributorsComponent from '../../components/ContributorsComponent/ContributorsComponent';
import PartnersComponent from '../../components/PartnersComponent/PartnersComponent';
import StyledTopAboutComponent from '../../components/AboutComponent/StyledTopAboutComponent';
import ContactComponent from '../../components/ContactComponent/ContactComponent';

const ColorRow = styled(Row)`
  background : ${props => props.backcolor || "#777"};
  z-index: -1;
`;

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render () {
    const { loading, isMobile, ...props } = this.props;
  
    return (!loading ? (
      <div className="AboutPage">
        <div className="container">
          <Row>
            <Col className="px-5 px-sm-0" xs={12}>
              <StyledTopAboutComponent isMobile={isMobile} />
            </Col>
            <Col className="px-5 px-md-0" xs={12} lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
              <ContributorsComponent isMobile={isMobile}/>
              <PartnersComponent isMobile={isMobile}/>
            </Col>
            </Row>
        </div>
        <div className="container-fluid">
          <ColorRow backcolor={"#D2FF9D"}>
            <Col className="px-4 px-sm-0" xs={12} lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
                <ContactComponent isMobile={isMobile} />
            </Col>
          </ColorRow>
        </div>
      </div>
    ) : <Loading />
  )
}
}

AboutPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.string,
  isMobile: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const userId = Meteor.userId();

  return {
    loading: false,
    userId,
  };
})(AboutPage);
