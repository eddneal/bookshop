import React from 'react';
import renderer from 'react-test-renderer';

import Layout from '../components/Layout';

describe('With Snapshot Testing', () => {
  it('Matches Snapshot', () => {
    const component = renderer.create(<Layout />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});