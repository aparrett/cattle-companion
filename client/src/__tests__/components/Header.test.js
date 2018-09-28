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

  it('should render auth nav if authenticated', () => {
    const wrapper = shallow(<Header authenticated="test" />);
    expect(wrapper.find('[data-test="auth-nav"]').length).toBe(1);
  });

  it('should not render auth nav if not authenticated', () => {
    const wrapper = shallow(<Header authenticated={false} />);
    expect(wrapper.find('[data-test="auth-nav"]').length).toBe(0);
  });
});
