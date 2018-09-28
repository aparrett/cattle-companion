import React from 'react';
import { mount, shallow } from 'enzyme';
import ConnectedLoginPage, { LoginPage } from '../../components/auth/LoginPage';
import Root from '../../Root';
import validate from '../../validation/validateLogin';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../validation/validateLogin');

describe('CowCreatePage', () => {
  let wrapper;
  const props = {
    history: { name: 'mockHistory' },
    loginUser: jest.fn(),
    clearAuthError: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(
      <Root>
        <MemoryRouter>
          <ConnectedLoginPage {...props} />
        </MemoryRouter>
      </Root>
    );
  });

  it('should render email field', () => {
    expect(wrapper.find('input[name="email"]').length).toBe(1);
  });

  it('should render password field', () => {
    expect(wrapper.find('input[name="password"]').length).toBe(1);
  });

  it('should call clearAuthError', () => {
    expect(props.clearAuthError).toHaveBeenCalled();
  });

  describe('on form submit', () => {
    it('should call validate function', () => {
      wrapper.find('form').simulate('submit');
      expect(validate).toHaveBeenCalled();
    });

    it('should call loginUser', () => {
      wrapper.find('form').simulate('submit');
      expect(props.loginUser).toHaveBeenCalled();
    });
  });

  it('should call loginUser on guest btn click', () => {
    wrapper.find('[data-test="guest"]').simulate('click');
    expect(props.loginUser).toHaveBeenCalled();
  });

  it('should display error if given', () => {
    const wrapper = shallow(<LoginPage error="error" handleSubmit={jest.fn()} {...props} />);
    expect(wrapper.find('.invalid-feedback').length).toBe(1);
  });

  it('should not display error if error not given', () => {
    const wrapper = shallow(<LoginPage handleSubmit={jest.fn()} {...props} />);
    expect(wrapper.find('.invalid-feedback').length).toBe(0);
  });
});
