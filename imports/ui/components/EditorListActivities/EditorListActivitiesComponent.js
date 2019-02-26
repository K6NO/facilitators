import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import EditorDeleteActivityButton from '../EditorDeleteActivityButton/EditorDeleteActivityButton';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';
import { getCategoryName, getLanguageName} from '../../../modules/get-select-translations';
import './EditorListActivitiesComponent.scss';

const StyledButton = styled(BasicStyledButton)`
`;
class EditorListActivitiesComponent extends React.Component{
  constructor(props){
    super(props);
  }
 
  /**
   * List activities with title, languages, arranged by category, with Edit buttons
   *    - sub to all activities (admins)
   * Add new activity button
   *    
   * Language selector tabs at top
   * Header below
   * Body below
   */
  render (){
    const {activities, language, editCallback } = this.props;
    const userId = Meteor.userId();
    return (
      <div className="EditorListActivitiesComponent">
        <Row>
          <Col>
          <Table>
              <thead>
                <tr>
                  <th>{i18n.__('activity.titleLabel')}</th>
                  <th>{i18n.__('activity.category')}</th>
                  <th>{i18n.__('activity.languagesLabel')}</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {activities.map(activity => 
                <tr key={activity._id}>
                    <td>
                        {activity.title[language]}
                    </td>
                    <td>
                        {getCategoryName(activity.category)}
                    </td>
                    <td>
                        {activity.languages.map(language => 
                            <span key={language}>{getLanguageName(language)}</span>
                        )}
                    </td>
                    <td>
                        {(Roles.userIsInRole(userId, ['admin']) || activity.owner === userId) ?
                          <StyledButton 
                          color={'white'}
                          backcolor={'#0e8ed5'}
                          onClick={() => editCallback(activity._id)}>
                          <Icon icon={'edit'} />
                          {` Edit`}
                        </StyledButton> : ''}
                    </td>
                    <td>
                      <EditorDeleteActivityButton
                        activity={activity}
                        userId={userId} />
                      
                    </td>
                </tr>)
              }
              </tbody>
          </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

EditorListActivitiesComponent.defaultProps = {
};

EditorListActivitiesComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  language: PropTypes.string.isRequired,
  editCallback: PropTypes.func.isRequired
};


export default EditorListActivitiesComponent;
