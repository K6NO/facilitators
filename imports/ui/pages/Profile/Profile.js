/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Row, Col, Button } from 'reactstrap';
import UserProfileComponent from './UserProfileComponent';
import UserNewsGamesComponent from './UserNewsGamesComponent';
import './Profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: 0,
    }
  }

  switchViews = (rank) => {
    this.setState({which: rank});
  };

  render() {
    const { history } = this.props;
    return (
      <div className="Profile container">
        <Row>
          <Col md={{size: 6, offset: 3}} className="ProfileHeader">
              <Button
                  value="games"
                  onClick={() => this.switchViews(0)}
                  className="toggleButton">NewsGames</Button>
              <Button
                  value="profile"
                  onClick={() => this.switchViews(1)}
                  className="toggleButton">Profile</Button>
          </Col>
        </Row>
            {this.state.which === 0
            ? <UserNewsGamesComponent history={history} /> 
            : ''}
            {this.state.which === 1 
            ? <UserProfileComponent user={Meteor.user()}/> : '' }
      </div>
    );
  }
}

Profile.propTypes = {
  
  history: PropTypes.object.isRequired,
};

