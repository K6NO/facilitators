import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import { Row, Col } from 'reactstrap';
import EditorTitleComponent from '../EditorTitleComponent/EditorTitleComponent';
import EditorCategoriesComponent from '../EditorCategoriesComponent/EditorCategoriesComponent';
import EditorTagsComponent from '../EditorTagsComponent/EditorTagsComponent';
import EditorPublicCBComponent from '../EditorPublicCBComponent/EditorPublicCBComponent';
import RenderEmailLink from './RenderEmailLink';
import EditorLanguageSelector from '../EditorLanguageSelector/EditorLanguageSelector';
import EditorLanguageCBWrapper from '../EditorLanguageCBWrapper/EditorLanguageCBWrapper';
import styled from 'styled-components';

const StyledText = styled.p`
    color: #ffffff;

`;

import './EditorActivityHeader.scss';

class EditorActivityHeader extends React.Component {
    constructor(props){
      super(props);
    }

    setBackground = (color) => {
        return {
            background : color
        }
    }

    render() {
        const { activity, language } = this.props;
        const category = activity.category;
        const color = category ? getColorByCategory(category) : '#cccccc';
        
        const showPublishChekbox = Roles.userIsInRole(Meteor.userId(), ['admin']);

        return (
            <div className="EditorActivityHeader">
                <Row>
                    <Col sm="6" style={this.setBackground(color)}>
                        <EditorLanguageSelector
                                language={language}
                                selectLanguageCallback={this.props.selectLanguageCallback}
                            />
                            
                        <EditorTitleComponent
                            activity={activity}
                            language={language} />
                        <EditorCategoriesComponent
                            activity={activity} />
                        <br/>
                        <EditorTagsComponent
                            activity={activity}
                            language={language} />
                    </Col>
                    <Col sm="6" className="text-right pt-3" style={this.setBackground(color)}>
                        {showPublishChekbox 
                        ? <div className="text-center">
                            <EditorPublicCBComponent activity={activity} />
                            <StyledText>Published language versions: </StyledText>
                            <EditorLanguageCBWrapper 
                            activity={activity} />
                            </div>
                        : <RenderEmailLink activity={activity} />
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

EditorActivityHeader.defaultProps = {
    
  };
  
EditorActivityHeader.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    selectLanguageCallback: PropTypes.func.isRequired,
};


export default EditorActivityHeader;