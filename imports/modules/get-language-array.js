import i18n from 'meteor/universe:i18n';

export const getLanguageName = (locale) => {
    return [
        { value: 'en-US', label: i18n.__('searchbox.en-US')},
        { value: 'es', label: i18n.__('searchbox.es')},
        { value: 'hu', label: i18n.__('searchbox.hu')},
        { value: 'ro', label: i18n.__('searchbox.ro')},
        { value: 'sk', label: i18n.__('searchbox.sk')},
    ].filter(e => e.value === locale)[0].label
};

export const getLanguageArray = () => {
    return [
        { value: 'en-US', label: i18n.__('searchbox.en-US')},
        { value: 'es', label: i18n.__('searchbox.es')},
        { value: 'hu', label: i18n.__('searchbox.hu')},
        { value: 'ro', label: i18n.__('searchbox.ro')},
        { value: 'sk', label: i18n.__('searchbox.sk')},
    ]
};