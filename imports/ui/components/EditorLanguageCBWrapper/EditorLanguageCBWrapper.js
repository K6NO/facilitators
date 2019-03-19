import React from 'react';
import PropTypes from 'prop-types';
import EditorLanguageCB from './EditorLanguageCB';
class EditorLanguageCBWrapper extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: this.props.language
      };
    }
      render () {
        const languageArray = ['en-US', 'es', 'hu', 'ro', 'sk'];
        const { activity } = this.props;
        return ( 
            <ul className="list-inline">
                {languageArray.map((lang, i) => 
                    <EditorLanguageCB 
                        key={lang + i}
                        activity={activity}
                        language={lang}
                    />
                )}
            </ul>
        )
      }
}
EditorLanguageCBWrapper.propTypes = {
    activity: PropTypes.object.isRequired,
};
  
export default EditorLanguageCBWrapper;
  