import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import CommentComponent from './CommentComponent';
import LoginModalController from '../LoginModal/LoginModalController';
import WriteCommentComponent from './WriteCommentComponent';
import { getColorByCategory } from '../../../modules/get-colors';


const StyledRow = styled(Row)`
    box-shadow: 0 3px 1px -2px #ddd;
`;
const ActivityText = styled.p`
    letter-spacing: .4px;

`;
class CommentsComponent extends React.Component {
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
                            isMobile={this.props.isMobile}
                        /> )}
                </Col>
                <Col xs={12}>
                    {this.renderActivityField('comment-dots', 'activity.writecomment')}
                </Col>
                <Col xs={12}>
                    {userId ? 
                        <WriteCommentComponent 
                        activity={activity}
                        color={color}    
                        isMobile={isMobile}
                        />
                    : <div className="text-center">
                        <p>You need to sign in to write a comment.</p>
                        <LoginModalController />
                    </div>
                    }
                    
                </Col>
            </Row>
        )
    }
}
CommentsComponent.defaultProps = {
    userId: '',
};
CommentsComponent.propTypes = {
  activity: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  userId: PropTypes.string
};

export default CommentsComponent; 