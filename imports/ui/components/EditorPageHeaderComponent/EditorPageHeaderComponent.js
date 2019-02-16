import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import EditorNewActivityButton from '../../components/EditorNewActivityButton/EditorNewActivityButton';
import EditorLanguageSelector from '../EditorLanguageSelector/EditorLanguageSelector';
import './EditorPageHeaderComponent.scss';

class EditorPageHeaderComponent extends React.Component{
  constructor(props){
    super(props);

  }
 
  // TODO need to set the language somewhere here with a component.
  // maybe store language setting here in state
  render (){
    return ( 
      <div className="EditorPageHeaderComponent">
        <Row>
            <Col sm="6">
                <EditorLanguageSelector
                    language={this.props.language}
                    selectLanguageCallback={this.props.selectLanguageCallback}
                />
            </Col>
            <Col sm="6">
                <EditorNewActivityButton
                    language={this.props.language}
                    editCallback={this.props.editCallback}
                />
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
};

export default EditorPageHeaderComponent;