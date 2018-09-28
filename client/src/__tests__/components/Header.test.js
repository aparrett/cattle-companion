import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import * as router from 'react-router-dom';

router.Link = jest.fn().mockReturnValue(() => null);
jest.mock('../../components/ErrorAlert', () => () => null);

describe('Header', () => {
  it('should render', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.html()).not.toBeNull();
  });

  it('should not render auth nav if not authenticated', () => {
    const wrapper = shallow(<Header authenticated={false} />);
    expect(wrapper.find('[data-test="auth-nav"]').length).toBe(0);
  });

  it('should render auth nav if authenticated', () => {
    const wrapper = shallow(<Header authenticated />);
    expect(wrapper.find('[data-test="auth-nav"]').length).toBe(1);
  });

  it('should call logoutUser on logout click', () => {
    const logoutUser = jest.fn();
    const wrapper = shallow(<Header authenticated logoutUser={logoutUser} />);
    wrapper.find('[data-test="logout"]').simulate('click');
    expect(logoutUser).toHaveBeenCalled();
  });
});
