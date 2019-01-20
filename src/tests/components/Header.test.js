import React from 'react';
import {shallow} from 'enzyme';
//import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});

import ReactShallowRenderer from 'react-test-renderer/shallow';

test('should render Header coorectly',()=>{
    const wrapper = shallow(<Header />);
    expect((wrapper)).toMatchSnapshot();
    //expect(wrapper.find('h1').text()).toBe("Expensify");
    
    //  const renderer = new ReactShallowRenderer();
    //  renderer.render(<Header />);
    //  expect(renderer.getRenderOutput()).toMatchSnapshot();
});