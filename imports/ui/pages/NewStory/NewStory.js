import React from 'react';
import PropTypes from 'prop-types';
import StoryEditor from '../../components/StoryEditor/StoryEditor';

const NewStory = ({ history }) => (
  <div className="NewStory">
    <h4 className="page-header">New Story</h4>
    <StoryEditor history={history} />
  </div>
);

NewStory.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewStory;
