import React from 'react';
import { mount } from 'enzyme';
import { ConnectedCowCreatePage } from '../../components/CowCreatePage';
import Root from '../../Root';
import validate from '../../validation/validateCow';
import * as actions from '../../actions/cattle';

jest.mock('../../components/fields/MotherSelect', () => () => <select name="mother" />);
jest.mock('../../components/fields/FatherSelect', () => () => <select name="father" />);
jest.mock('../../validation/validateCow');

describe('CowCreatePage', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        farmId: '1'
      }
    },
    history: { name: 'mockHistory' },
    saveCow: jest.spyOn(actions, 'saveCow')
  };

  beforeEach(() => {
    wrapper = mount(
      <Root>
        <ConnectedCowCreatePage {...props} />
      </Root>
    );
  });

  describe('should render', () => {
    it('should render name field', () => {
      expect(wrapper.find('input[name="name"]').length).toBe(1);
    });

    it('should render gender fields', () => {
      expect(wrapper.find('input[name="gender"]').length).toBe(2);
    });

    it('should render dateOfBirth field', () => {
      expect(wrapper.find('input[name="dateOfBirth"]').length).toBe(1);
    });

    it('should render mother field', () => {
      expect(wrapper.find('select[name="mother"]').length).toBe(1);
    });

    it('should render father field', () => {
      expect(wrapper.find('select[name="father"]').length).toBe(1);
    });
  });

  describe('on form submit', () => {
    it('should call validate function', () => {
      wrapper.find('form').simulate('submit');
      expect(validate).toHaveBeenCalled();
    });

    it('should call saveCow', () => {
      wrapper.find('form').simulate('submit');
      expect(actions.saveCow).toHaveBeenCalledWith({ farm: '1' }, { name: 'mockHistory' });
    });
  });
});
