import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import EditorActivityHeader from './EditorActivityHeader';
import EditorActivityBody from './EditorActivityBody';
import EditorActivityFooter from './EditorActivityFooter';
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
    const {activity} = this.props;
    return (
      <div className="EditorSingleActivityComponent">
        <EditorActivityHeader activity={activity} />
        <EditorActivityBody activity={activity} />
        <EditorActivityFooter activity={activity} />

      </div>
    );
  }
}

EditorSingleActivityComponent.defaultProps = {
};

EditorSingleActivityComponent.propTypes = {
  activity: PropTypes.object.isRequired,
};


export default EditorSingleActivityComponent;
