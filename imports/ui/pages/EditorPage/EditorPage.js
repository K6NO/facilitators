import React from 'react';
import EditorListActivitiesWrapper from '../../components/EditorListActivities/EditorListActivitiesWrapper';
import EditorSingleActivityWrapper from '../../components/EditorSingleActivity/EditorSingleActivityWrapper';
import EditorNewActivityButton from '../../components/EditorNewActivityButton/EditorNewActivityButton';
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
 
  // TODO need to set the language somewhere here with a component.
  // maybe store language setting here in state
  render (){
    return ( 
      <div className="EditorPage">
        <EditorNewActivityButton
          language={this.state.language}
        />
        {this.state.single ?
        <EditorSingleActivityWrapper
          language={this.state.language}
          activityId={this.state.activityId}
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