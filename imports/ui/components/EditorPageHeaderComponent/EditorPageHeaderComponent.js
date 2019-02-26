import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import EditorNewActivityButton from '../../components/EditorNewActivityButton/EditorNewActivityButton';
import EditorLanguageSelector from '../EditorLanguageSelector/EditorLanguageSelector';
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
                <EditorLanguageSelector
                    language={this.props.language}
                    selectLanguageCallback={this.props.selectLanguageCallback}
                />
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
    selectLanguageCallback: PropTypes.func.isRequired,
    editCallback: PropTypes.func.isRequired,
    single: PropTypes.bool.isRequired,
    closeCallback: PropTypes.func.isRequired,

};

export default EditorPageHeaderComponent;