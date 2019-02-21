import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Badge, Button } from 'reactstrap';

const ColorIconWrapper = styled.h5`
        color: darkslategrey;
`;

const Text = styled.span`
    letter-spacing: .8px;
    font-size: 1.3rem;
    color: darkslategrey;
`
const StyledBadge = styled(Badge)`
    padding: .6rem 1rem!important;
    color: ${props => props.backcolor || '#777777'}!important;
    text-transform: uppercase;
    border: ${props => '1px ' + props.backcolor + ' solid' || '1px solid #777777'}!important;
    font-size: 1.2rem;
    letter-spacing: .8px;
    margin: 1px;
    background-color: white!important;
    white-space: nowrap;
    vertical-align: baseline;
    text-align: center;
    border-radius: 10rem!important;
`;

const StyledSelectButton = styled.button`
    height: 40px;
    min-width: 110px;
    padding: .8rem 1.5rem;
    background: white;
    /* background: #0e8ed511; */
    color: darkslategray;
    border-radius: 5px;
    border: 0;
    box-shadow: 1px 1px 3px 1px #dddddd;
    text-transform: uppercase;
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    font-weight: 100;
    
    &:hover {
        background: #ededed!important;
    }
    &:focus {
        outline: 1px dotted;
        background: #0e8ed533!important;
    }
`

const StyledTagsWrapper = styled(Col)`
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 50px;
`;

class ActivityPreviewComponentBody extends React.Component {
    constructor(props){
      super(props);
    }

    renderActivityField = (icon, activityField) => {
        return (
            <ColorIconWrapper>
                <Icon 
                    icon={icon} 
                    size={'lg'} />
            </ColorIconWrapper>
        )
    }
    renderTags = (activity, color) => {
        return activity.tags.map((tagIndex) =>   
            <StyledBadge 
                backcolor={color}
                key={tagIndex}
                
                >
                {i18n.__(`tags.${tagIndex}`)}
            </StyledBadge>
        );

    }
    render() {
        const { activity, selectActivityCallback } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <div className="ActivityPreviewComponentBody">
                <Row>
                    <Col xs="12" className="mt-2">
                        <Row className="mt-2">
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('address-card', 'activity.age')}
                            </Col>
                            <Col xs="10" >
                                <Text>{i18n.__(`activity.${activity.age}`)}</Text>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('clock', 'activity.time')}
                            </Col>
                            <Col xs="10" >
                                <Text>{i18n.__(`activity.${activity.time}`)}</Text>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('users', 'activity.group')}
                            </Col>
                            <Col xs="10" >
                                <Text>{i18n.__(`activity.${activity.group}`)}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <StyledTagsWrapper xs="11">
                        {this.renderTags(activity, color)}
                    </StyledTagsWrapper>
                </Row>
                <Row>
                    <Col xs="12" className="mt-2 mb-4">
                        <StyledSelectButton
                            onClick={()=> selectActivityCallback(activity._id)}>
                                {i18n.__('searchbox.moreinfo')}
                        </StyledSelectButton>
                    </Col>
                </Row>

            </div>
        )
    }
}

ActivityPreviewComponentBody.defaultProps = {
    
  };
  
  ActivityPreviewComponentBody.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityPreviewComponentBody;