import GoogleAnalytics from 'react-ga';

export const registerEvent = (category, action, label) => {
    GoogleAnalytics.event({
        category: category,
        action: action,
        label: label,
    });
}