import React from 'react';
import EditorListActivitiesWrapper from '../../components/EditorListActivities/EditorListActivitiesWrapper'
import './EditorPage.scss';

class EditorPage extends React.Component{
  constructor(props){
    super(props);
  }
 
  render (){
    return ( 
      <div className="EditorPage">
        <EditorListActivitiesWrapper />
      </div>
    );
  }
}

export default EditorPage;