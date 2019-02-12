import React from 'react';
import PropTypes from 'prop-types';
import EditorActivityHeader from './EditorActivityHeader';
import EditorActivityBody from './EditorActivityBody';
import './EditorSingleActivityComponent.scss';

class EditorSingleActivityComponent extends React.Component{
  constructor(props){
    super(props);
  }
 
  /**
   *    
   * Language selector tabs at top
   * Header below
   * Body below
   */
  render (){
    const {activity, language} = this.props;
    return (
      <div className="EditorSingleActivityComponent">
        <EditorActivityHeader 
          activity={activity}
          language={language} 
        />
        <EditorActivityBody 
          activity={activity}
          language={language}
        />
      </div>
    );
  }
}

EditorSingleActivityComponent.defaultProps = {
};

EditorSingleActivityComponent.propTypes = {
  activity: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};


export default EditorSingleActivityComponent;
