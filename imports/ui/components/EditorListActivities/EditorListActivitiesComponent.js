import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import Icon from '../Icon/Icon';
import { getCategoryName } from '../../../modules/get-category-name';
import { getLanguageName } from '../../../modules/get-language-array';
import './EditorListActivitiesComponent.scss';

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
                      <Button 
                        color="primary"
                        onClick={() => editCallback(activity._id)}>
                        <Icon icon={'edit'} />
                        ` Edit`
                      </Button>
                  </td>
                  <td>
                      <Button color="danger">
                        <Icon icon={'trash'} />
                        ` Delete`
                      </Button>
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
