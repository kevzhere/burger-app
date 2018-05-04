import React from 'react';

import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//first value is jsut a name for valueoutput
describe('<NavigationItems/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>)
    });
    it('should render two <NavigationItem/> elements if not auth', ()=>{
         
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elements if auth', ()=>{
        // wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({
            isAuthenticated: true
        })
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should show a logout button', ()=>{
        // wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({
            isAuthenticated: true
        })
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});