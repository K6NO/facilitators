import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import EditorNewActivityButton from '../../components/EditorNewActivityButton/EditorNewActivityButton';
import EditorBackButton from '../EditorBackButton/EditorBackButton';
import './EditorPageHeaderComponent.scss';

class EditorPageHeaderComponent extends React.Component{
  constructor(props){
    super(props);

  }
 
  render (){
    return (
      <div className="EditorPageHeaderComponent mb-5">
        <Row>
            <Col sm="6">
            </Col>
            <Col sm="6">
            {!this.props.single ? 
              <EditorNewActivityButton 
                language={this.props.language}
                editCallback={this.props.editCallback}
              />  : 
              <EditorBackButton
                closeCallback={this.props.closeCallback}
              />
              }
            </Col>
        </Row>
      </div>
    );
  }
}

EditorPageHeaderComponent.propTypes = {
  language: PropTypes.string.isRequired,
  editCallback: PropTypes.func.isRequired,
  single: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,

};

export default EditorPageHeaderComponent;