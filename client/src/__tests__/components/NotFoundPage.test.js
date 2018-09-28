import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper.html()).not.toBeNull();
  });
});