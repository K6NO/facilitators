import React from 'react';
import './EditorNewActivityButton.scss';
import newActivity from './mockNewActivity.json';

class EditorNewActivityButton extends React.Component{
  constructor(props){
    super(props);
  }
 
  createActivity = () => {
    
  }
  render (){
    return ( 
      <div className="EditorPage">
        <button>Add new activity</button>
      </div>
    );
  }
}

export default EditorNewActivityButton;