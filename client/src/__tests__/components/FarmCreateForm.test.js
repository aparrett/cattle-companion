import React from 'react';
import { mount } from 'enzyme';
import FarmCreateForm from '../../components/FarmCreateForm';
import Root from '../../Root';
import validate from '../../validation/validateFarm';

jest.mock('../../validation/validateFarm');

describe('FarmCreateForm', () => {
  let wrapper;
  const saveFarm = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Root>
        <FarmCreateForm saveFarm={saveFarm} />
      </Root>
    );
  });

  describe('should render', () => {
    it('should render name field', () => {
      expect(wrapper.find('input[name="name"]').length).toBe(1);
    });
  });

  describe('on form submit', () => {
    it('should call validate function', () => {
      wrapper.find('form').simulate('submit');
      expect(validate).toHaveBeenCalled();
    });

    it('should call saveFarm', () => {
      wrapper.find('form').simulate('submit');
      expect(saveFarm).toHaveBeenCalled();
    });
  });
});
