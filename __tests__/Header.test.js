import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Header, { navItems } from '../components/Header';

describe('With Enzyme', () => {
  it('Header outputs navItems as links', () => {
    const app = shallow(<Header page="Home" />);
    navItems.forEach((item, navIndex) => {
      app.find('a').forEach((elem, elemIndex) => {
        if (navIndex === elemIndex) {
          expect(elem.text()).toEqual(item.name);
        }
      });
    });
  });
});

describe('With Snapshot Testing', () => {
  it('Header matches Snapshot', () => {
    const component = renderer.create(<Header page="About" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
