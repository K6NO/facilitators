import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import Icon from '../Icon/Icon';

class DetailedSearchButton extends React.Component{
    constructor(props){
      super(props);
    }

    render () {
        const { detailed, callback } = this.props;
    
        return (
            <Button 
                color="link"
                onClick={callback}>
                {!detailed ? i18n.__('searchbox.detailedBtn') : i18n.__('searchbox.simpleBtn')}
            </Button>
        )
    }
}

DetailedSearchButton.propTypes = {
    detailed : PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired
};

export default DetailedSearchButton;