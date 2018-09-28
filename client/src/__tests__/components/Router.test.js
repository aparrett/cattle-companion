import React from 'react';
import { shallow } from 'enzyme';
import Router from '../../components/Router';
import * as router from 'react-router-dom';

router.Switch = jest.fn().mockReturnValue(() => <div />);

describe('Router', () => {
  it('should render', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper.html()).not.toBeNull();
  });
});
