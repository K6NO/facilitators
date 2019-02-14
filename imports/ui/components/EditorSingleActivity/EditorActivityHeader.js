import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Button } from 'reactstrap';
import EditorTitleComponent from '../EditorTitleComponent/EditorTitleComponent';
import EditorCategoriesComponent from '../EditorCategoriesComponent/EditorCategoriesComponent';
import EditorTagsComponent from '../EditorTagsComponent/EditorTagsComponent';

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
        const { activity, language, closeCallback } = this.props;
        const category = activity.category;
        const color = category ? getColorByCategory(category) : '#cccccc';
        return (
            <div className="EditorActivityHeader">
                <Row>
                    <Col sm="6" style={this.setBackground(color)}>
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
                        <Button 
                            color="link" 
                            className="backLink"
                            onClick={closeCallback}
                            >
                            <Icon icon={'angle-double-left'} size={'lg'}/>
                            {`Finish & Back to list`}
                        </Button>
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
    closeCallback: PropTypes.func.isRequired
};


export default EditorActivityHeader;