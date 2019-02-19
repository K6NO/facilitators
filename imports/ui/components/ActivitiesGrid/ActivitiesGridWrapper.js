import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Row, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import Activities from '../../../api/Activities/Activities';
import ActivitiesGrid from './ActivitiesGrid';
import Loading from '../Loading/Loading';
import _ from 'lodash';


class ActivitiesGridWrapper extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { activities, totalCount, pageSize, loading} = this.props;
        const pageCount = totalCount / pageSize;
        console.log({totalCount, pageCount})

        console.log('wrapper', {activities})
        return (!loading ? 
            <div className="ActivitiesGridWrapper">
                <ActivitiesGrid
                    activities={activities} />
                <Row>
                    <Col>
                        <ReactPaginate 
                        previousLabel={"previous"}
                        nextLabel={"next"}
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
    pageNumberCallback: PropTypes.func.isRequired
};


export default withTracker(({filterObject, pageSize, pageNum}) => {
    let activitySub, activityCountSub, totalCount;
    let activities = [];
    // remove the keys with empty values --> []
    Object.keys(filterObject).map(key => filterObject[key].length < 1 && delete filterObject[key]);
        
    if(!_.isEmpty(filterObject)) {
        // if there are filter values qquery with those, use pagination
        activitySub = Meteor.subscribe('activities.allFilter', filterObject, pageNum, pageSize);
        activityCountSub = Meteor.subscribe('activities.countFilter', filterObject);
        activities = Activities.find().fetch();
        totalCount = Activities.find().count();
    } else {
        // filter is empty, use pagination
        activitySub = Meteor.subscribe('activities.all', pageNum, pageSize);
        activityCountSub = Meteor.subscribe('activities.allCount');
        activities = Activities.find().fetch();
        totalCount = Activities.find().count();
    }
    return {
        loading: !activitySub.ready() && !activityCountSub.ready(),
        activities,
        totalCount
    };
})(ActivitiesGridWrapper);
