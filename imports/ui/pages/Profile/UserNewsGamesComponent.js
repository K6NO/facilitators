import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Row, Col,  } from 'reactstrap';
import './UserNewsGamesComponent.scss';

class UserNewsGamesComponent extends React.Component {
    constructor(props) {
      super(props);
      autoBind(this);
    }

    render () {
        const { history } = this.props;
        
        return (
        <Row>
          <Col>
            <div className="ProfileNewsGames clearfix">
            <h6>NewsGames in progress</h6>
            
            </div>
          </Col>
        </Row>
        );
      }
    }


      UserNewsGamesComponent.propTypes = {
        history: PropTypes.object.isRequired,
      };

    export default UserNewsGamesComponent;
