import React from 'react';
import { Route } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { Meteor } from 'meteor/meteor';

GoogleAnalytics.initialize(Meteor.settings.public.analytics);

class Analytics extends React.Component {
  componentDidMount() {
    this.sendPageChange(this.props.location.pathname, this.props.location.search)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname
      || this.props.location.search !== prevProps.location.search) {
      this.sendPageChange(this.props.location.pathname, this.props.location.search)
    }
  }

  sendPageChange(pathname, search="") {
    const page = pathname + search;
    GoogleAnalytics.set({page});
    GoogleAnalytics.pageview(page);
  }

  render() {
    return null
  }
}

export default AnalyticsTracker = () => {
  return <Route component={Analytics} />
}