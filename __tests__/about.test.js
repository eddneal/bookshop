import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../pages/about';

describe('With Enzyme', () => {
  it('About shows "About"', () => {
    const app = shallow(<App />);

    expect(app.find('h1').text()).toEqual('About');
  });
});

describe('With Snapshot Testing', () => {
  it('About shows "About"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
