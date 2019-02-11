/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'reactstrap';
import AdminOrganisationComponent from './AdminOrganisationComponent';
import './AdminOrganisationsComponent.scss';

class AdminOrganisationsComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { organisations } = this.props;
    return (
        <div className="border AdminOrganisationsComponent container">
       
        {organisations.length ? (
            <Row>
                <Col>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {organisations.map(org => (
                            <AdminOrganisationComponent key={org._id} organisation={org} />
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        ) : <div>There are no organisations</div>}
        </div>
    );
  }
}

AdminOrganisationsComponent.defaultProps = {
  organisations : [],
};

AdminOrganisationsComponent.propTypes = {
  organisations: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

export default AdminOrganisationsComponent;