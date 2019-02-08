import React from 'react';
import EditorListActivitiesWrapper from '../../components/EditorListActivities/EditorListActivitiesWrapper'
import './EditorPage.scss';
import EditorSingleActivityWrapper from '../../components/EditorSingleActivity/EditorSingleActivityWrapper';

class EditorPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      language: 'en-US'
    }
  }
 
  // need to set the language somewhere here with a component.
  // maybe store language setting here in state
  render (){
    return ( 
      <div className="EditorPage">
        <EditorListActivitiesWrapper
          language={this.state.language}
        />
        <EditorSingleActivityWrapper
          language={this.state.language}
        />
      </div>
    );
  }
}

export default EditorPage;