import React from 'react';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import setLocale from '../../../modules/set-locale';

i18n.setLocale('hu')
let locale = getLocale();

const T = i18n.createComponent();


// displays 'hello world!' where our en-us.i18n.json
// has the key/value { "hello": "hello world!" }

class Welcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          locale: i18n.getLocale(),
        };
    }
    changeLocale = (locale) => {
        setLocale(locale);
        this.setState({
            locale: getLocale()
        });
    }
    render () {
        const { props } = this.props;
        const locale = this.state.locale;
        return (
        <div>
            <h1><T _locale={locale}>menu.language</T></h1>
            <T _locale={locale}>hello</T>
            <select name="lang-select">
                <option value="en"><p><T _locale={locale}>searchbox.en</T></p></option>
                <option value="es"><T _locale={locale}>searchbox.es</T></option>
                <option value="hu"><T _locale={locale}>searchbox.hu</T></option>
                <option value="ro"><T _locale={locale}>searchbox.ro</T></option>
                <option value="sk"><T _locale={locale}>searchbox.sk</T></option>
            </select>
            <p><T _locale={locale}>searchbox.en</T></p>
            <button onClick={() => this.changeLocale('en')} >Set local</button>
            
        </div>
        )
    }
}
export default Welcome;