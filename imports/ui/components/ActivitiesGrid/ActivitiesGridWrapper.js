import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Row, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Activities from '../../../api/Activities/Activities';
import ActivitiesGrid from './ActivitiesGrid';
import Loading from '../Loading/Loading';
import Icon from '../Icon/Icon';
import _ from 'lodash';
import './ActivitiesGridWrapper.scss';


class ActivitiesGridWrapper extends React.Component {
    constructor(props){
      super(props);
    }

    handlePageClick = (data) => {
        const { pageNumberCallback } = this.props;
        const selected = data.selected;
        pageNumberCallback(selected);
    }
    render() {
        const { activities, totalCount, pageSize, loading, selectActivityCallback} = this.props;
        const pageCount = Math.ceil(totalCount / pageSize);
        const isMobile = window.innerWidth < 500;

        return (!loading ? 
            <div className="ActivitiesGridWrapper">
                {!isMobile ? 
                <Row>
                    <Col>
                        <ReactPaginate 
                        previousLabel={<Icon icon={'chevron-left'} />}
                        nextLabel={<Icon icon={'chevron-right'} />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                    </Col>
                </Row> : ''}
                <Row>
                    <Col>
                        <span>{totalCount} {i18n.__('searchbox.matching')}</span>
                    </Col>
                </Row>
                <ActivitiesGrid
                    activities={activities}
                    selectActivityCallback={selectActivityCallback} />
                <Row>
                    <Col>
                        <ReactPaginate 
                        previousLabel={<Icon icon={'chevron-left'} />}
                        nextLabel={<Icon icon={'chevron-right'} />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                    </Col>
                </Row> 
            </div>
            : <Loading/>
        )
    }
}

ActivitiesGridWrapper.defaultProps = {
  };
  
ActivitiesGridWrapper.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    filterObject: PropTypes.object.isRequired,
    pageSize : PropTypes.number.isRequired,
    pageNum : PropTypes.number.isRequired,
    pageNumberCallback: PropTypes.func.isRequired,
    selectActivityCallback: PropTypes.func.isRequired
};


export default withTracker(({filterObject, pageSize, pageNum}) => {
    let activitySub, activityCountSub, totalCount;
    let activities = [];
    /** Remove the keys with empty values --> []
     * Otherwise mongoFilterArray is badly formatted for the query
    */
    Object.keys(filterObject).map(key => filterObject[key].length < 1 && delete filterObject[key]);
    const skips = pageSize * pageNum;

    /**
     * Need to explicitly provide search query and parameters, otherwise
     * the find and the count subscriptions override each other
     * 
     * sadpanda :(
     */
    if(!_.isEmpty(filterObject)) {
        const mongoFilterArray = Object.entries(filterObject).map(([key, values]) => (
            { [key] : {$in : values } }
        ));
        // if there are filter values qquery with those, use pagination
        activitySub = Meteor.subscribe('activities.allFilter', filterObject, pageNum, pageSize);
        activities = Activities.find({$and: mongoFilterArray}, {
            skip: skips,
            limit: pageSize
          }).fetch();
        activityCountSub = Meteor.subscribe('activities.filterCount', filterObject);
        totalCount = Activities.find().count();
    } else {
        // filter is empty, use pagination
        activitySub = Meteor.subscribe('activities.all', pageNum, pageSize);
        activities = Activities.find({}, {skip: skips,
            limit: pageSize
        }).fetch();
        activityCountSub = Meteor.subscribe('activities.allCount');
        totalCount = Activities.find().count();
    }
    return {
        loading: !activitySub.ready() && !activityCountSub.ready(),
        activities,
        totalCount
    };
})(ActivitiesGridWrapper);
