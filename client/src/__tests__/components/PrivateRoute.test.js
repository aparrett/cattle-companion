import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../components/PrivateRoute';
import MemoryRouter from 'react-router-dom/MemoryRouter';

describe('PrivateRoute', () => {
  let wrapper;
  const fetchUser = jest.fn();
  const Component = () => <div />;

  it('should call fetchUser', () => {
    wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={Component} fetchUser={fetchUser} />
      </MemoryRouter>
    );

    expect(fetchUser).toHaveBeenCalled();
  });

  it('should return component with props if authenticated', () => {
    wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={Component} fetchUser={fetchUser} authenticated />
      </MemoryRouter>
    );

    expect(wrapper.find('Component').prop('match')).not.toBeNull;
    expect(wrapper.find('Component').length).toBe(1);
  });

  it('should not return component if not authenticated', () => {
    wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={Component} fetchUser={fetchUser} />
      </MemoryRouter>
    );

    expect(wrapper.find('Component').length).toBe(0);
  });
});
