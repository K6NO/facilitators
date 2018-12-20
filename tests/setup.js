import 'raf/polyfill';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

global.mount = mount;
global.shallow = shallow;
global.render = render;
