import React from 'react';
import PropTypes from 'prop-types';
import EditorActivityHeader from './EditorActivityHeader';
import EditorActivityBody from './EditorActivityBody';
import './EditorSingleActivityComponent.scss';

class EditorSingleActivityComponent extends React.Component{
  constructor(props){
    super(props);
  }
 
  render (){
    const {...props} = this.props;
    return (
      <div className="EditorSingleActivityComponent">
        <EditorActivityHeader 
          {...props}
        />
        <EditorActivityBody 
          {...props}  
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
