import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import { BasicStyledButton, BasicStyledBadge } from '../MainStyledComponents/MainStyledComponents';

const ColorIconWrapper = styled.h5`
        color: darkslategrey;
`;

const Text = styled.span`
    letter-spacing: .8px;
    font-size: 1.3rem;
    color: darkslategrey;
`
const StyledBadge = styled(BasicStyledBadge)`
      border: ${props => `1px solid ${props.color}`};
      text-transform: uppercase;
      display: inline-flex;
      margin: .5rem;
      font-size: 8px;
        font-weight: bold;
        padding: .3rem .8rem;
`;

const StyledSelectButton = styled(BasicStyledButton)`
    width: 100%;
    display: block;
    box-shadow: 1px 1px 3px 1px #dddddd;
`

const StyledTagsWrapper = styled(Col)`
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 50px;
    display: inline-block;
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
        return activity.tags.map((tagIndex, i) =>   
            <StyledBadge 
                color={color}
                backcolor={"#ffffff"}
                key={tagIndex + i}
                
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
                            <Col xs="10 my-auto" >
                                <Text>{i18n.__(`activity.${activity.age}`)}</Text>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('clock', 'activity.time')}
                            </Col>
                            <Col xs="10 my-auto" >
                                <Text>{i18n.__(`activity.${activity.time}`)}</Text>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('users', 'activity.group')}
                            </Col>
                            <Col xs="10 my-auto" >
                                <Text>{i18n.__(`activity.${activity.group}`)}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <StyledTagsWrapper xs="12">
                        {this.renderTags(activity, color)}
                    </StyledTagsWrapper>
                </Row>
                <Row>
                    <Col xs="12" className="mt-2 mb-4">
                        <StyledSelectButton
                            color={'white'}
                            backcolor={color}
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