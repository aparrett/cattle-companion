import React from 'react';
import { shallow } from 'enzyme';
import { ErrorAlert } from '../../components/ErrorAlert';

describe('ErrorAlert', () => {
  describe('if error not given', () => {
    it('should return null', () => {
      const wrapped = shallow(<ErrorAlert />);
      expect(wrapped.html()).toBeNull();
    });
  });

  describe('if error given', () => {
    it('should render error', () => {
      const error = 'error';
      const wrapped = shallow(<ErrorAlert error={error} />);
      expect(wrapped.text()).toContain(error);
    });

    it('should call dismissError on close click', () => {
      const dismissError = jest.fn();
      const wrapped = shallow(<ErrorAlert error="error" dismissError={dismissError} />);

      wrapped.find('.close').simulate('click');

      expect(dismissError).toHaveBeenCalled();
    });
  });
});
