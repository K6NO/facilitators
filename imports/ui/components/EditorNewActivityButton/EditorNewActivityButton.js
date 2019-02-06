import React from 'react';
import './EditorNewActivityButton.scss';

class EditorNewActivityButton extends React.Component{
  constructor(props){
    super(props);
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