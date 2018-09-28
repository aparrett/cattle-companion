import React from 'react';
import { mount } from 'enzyme';
import { ConnectedCowEditPage } from '../../components/CowEditPage';
import Root from '../../Root';
import validate from '../../validation/validateCow';

jest.mock('../../components/fields/MotherSelect', () => () => <select name="mother" />);
jest.mock('../../components/fields/FatherSelect', () => () => <select name="father" />);
jest.mock('../../validation/validateCow');

describe('CowEditPage', () => {
  let wrapper;
  const cowId = 'cow';
  const farmId = 'farm';
  const props = {
    match: {
      params: {
        id: cowId,
        farmId
      }
    },
    history: { name: 'mockHistory' },
    editCow: jest.fn(),
    fetchCow: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(
      <Root>
        <ConnectedCowEditPage {...props} />
      </Root>
    );
  });

  it('should call fetchCow', () => {
    expect(props.fetchCow).toHaveBeenCalledWith(cowId);
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

    it('should call editCow', () => {
      wrapper.find('form').simulate('submit');
      expect(props.editCow).toHaveBeenCalled();
    });
  });
});
