import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import CommentComponent from '../CommentsComponent/CommentComponent';
import { getColorByCategory } from '../../../modules/get-colors';


const StyledRow = styled(Row)`
    box-shadow: 0 3px 1px -2px #ddd;
`;
const ActivityText = styled.p`
    letter-spacing: .4px;

`;
class EditorCommentsComponent extends React.Component {
    constructor(props){
      super(props);
    }

    renderActivityField = (icon, activityField) => {
        return (
            <h5 className="activityHeader font-weight-bold">
                <Icon 
                    icon={icon} 
                    size={'lg'} />
                <span className="ml-3">{i18n.__(activityField)}</span>
            </h5>
        )
    }
    removeComment = (comment) => {
        const { activity } = this.props;
        
        const authorized = !comment.authorized;
        console.log(comment, activity, authorized);
        Meteor.call('activities.updateComment', comment, activity, authorized, (error) => {
            if(error) {
                Bert.alert('Cannot remove comment. ' + error.message, 'danger');
            } else {
                Bert.alert(!authorized ? 
                    'Comment was removed from public page.'
                    :'Comment was re-published.', 'success');
            }
        })
    }
    render () {
        const { activity, isMobile, userId } = this.props;
        const color = getColorByCategory(activity.category)
        return (
            <Row>
                <Col xs={12}>
                    {this.renderActivityField('comments', 'activity.comments')}
                </Col>
                <Col xs={12}>
                    {activity.comments.map((comment, i) => 
                        <CommentComponent 
                            key={comment.updatedAt + i}
                            color={color}    
                            comment={comment}
                            isEditor={true}
                            removeComment={this.removeComment}
                        /> )}
                </Col>
            </Row>
        )
    }
}
EditorCommentsComponent.defaultProps = {
    userId: '',
};
EditorCommentsComponent.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default EditorCommentsComponent; 