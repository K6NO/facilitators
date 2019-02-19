import React from 'react';
import PropTypes from 'prop-types';

class ActivitiesGrid extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        
        
        return (
            <div className="ActivitiesGrid">
                ide gyün a grid
            </div>
        )
    }
}

ActivitiesGrid.defaultProps = {
    
};
  
ActivitiesGrid.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default ActivitiesGrid;
