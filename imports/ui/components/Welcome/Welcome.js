import React from 'react';
import i18n from 'meteor/universe:i18n';

i18n.setLocale('hu')
let locale = i18n.getLocale();
console.log(locale)

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
        console.log('runs')
        i18n.setLocale(locale);
        this.setState({
            locale: i18n.getLocale()
        })
    }
    render () {
        const { props } = this.props;
        return (
        <div>
            <h1><T _locale={locale}>menu.language</T></h1>
            <T _locale={this.state.locale}>hello</T>
            <button onClick={() => this.changeLocale()} >Set local</button>
            <p>{this.state.locale}</p>
        </div>
        )
    }
}
export default Welcome;