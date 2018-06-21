import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../components/Footer';

describe('With Enzyme', () => {
  it('Footer shows copyright info', () => {
    const app = shallow(<Footer />);

    expect(app.find('p').text()).toEqual('Copyright © Bookshop 2018');
  });
});

describe('With Snapshot Testing', () => {
  it('Matches Snapshot', () => {
    const component = renderer.create(<Footer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});