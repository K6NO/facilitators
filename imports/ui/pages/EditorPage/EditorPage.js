import React from 'react';
import EditorPageHeaderComponent from '../../components/EditorPageHeaderComponent/EditorPageHeaderComponent';
import EditorListActivitiesWrapper from '../../components/EditorListActivities/EditorListActivitiesWrapper';
import EditorSingleActivityWrapper from '../../components/EditorSingleActivity/EditorSingleActivityWrapper';
import './EditorPage.scss';

class EditorPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      language: 'en-US',
      single: false,
      activityId: null
    }
  }

  editSingleActivity = (activityId) => {
    this.setState({
      single: true,
      activityId: activityId
    });
  }

  closeSingleActivity = () => {
    this.setState({
      single: false,
      activityId: ''
    })
  }

  selectLanguage = (language) => {
    this.setState({language: language});
  }
 
  // TODO need to set the language somewhere here with a component.
  // maybe store language setting here in state
  render (){
    return ( 
      <div className="EditorPage container">
        <EditorPageHeaderComponent 
          language={this.state.language}
          selectLanguageCallback={this.selectLanguage}
          editCallback={this.editSingleActivity}
        />
        {this.state.single ?
        <EditorSingleActivityWrapper
          language={this.state.language}
          activityId={this.state.activityId}
          closeCallback={this.closeSingleActivity}
        /> 
        :
        <EditorListActivitiesWrapper
          language={this.state.language}
          editCallback={this.editSingleActivity}
        />
        }

      </div>
    );
  }
}

export default EditorPage;