import i18n from 'meteor/universe:i18n';

export const getCategoryName = (category) => {
    return [
        { value: 'footprint', label: i18n.__('categories.footprint')},
        { value: 'deepeco', label: i18n.__('categories.deepeco')},
        { value: 'ecofem', label: i18n.__('categories.ecofem')},
        { value: 'landart', label: i18n.__('categories.landart')},
        { value: 'food', label: i18n.__('categories.food')},
        { value: 'community', label: i18n.__('categories.community')},
    ].filter(e => e.value === category)[0].label
};

export const getCategoryArray = () => {
    return [
        { value: 'footprint', label: i18n.__('categories.footprint')},
        { value: 'deepeco', label: i18n.__('categories.deepeco')},
        { value: 'ecofem', label: i18n.__('categories.ecofem')},
        { value: 'landart', label: i18n.__('categories.landart')},
        { value: 'food', label: i18n.__('categories.food')},
        { value: 'community', label: i18n.__('categories.community')},
    ]
};