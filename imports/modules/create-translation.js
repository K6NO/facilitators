import i18n from 'meteor/universe:i18n';

export default createTranslation = (key) => {
    const t = i18n.createTranslator('');
    return t(key);
}