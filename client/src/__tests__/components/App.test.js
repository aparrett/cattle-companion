import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';
import Root from '../../Root';

jest.mock('../../components/Router', () => jest.fn().mockReturnValue(null));

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Root>
        <App />
      </Root>
    );

    expect(wrapper.html()).not.toBeNull();
  });
});
