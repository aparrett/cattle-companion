import React from 'react';
import { shallow, mount } from 'enzyme';
import { HomePage } from '../../components/HomePage';

jest.mock('../../components/FarmCreateForm', () => () => <div data-test="create-form" />);
jest.mock('../../components/FarmListItem', () => () => <div data-test="list-item" />);

describe('HomePage', () => {
  const fetchFarms = jest.fn();

  describe('isLoading', () => {
    it('should not render', () => {
      const wrapper = shallow(<HomePage isLoading fetchFarms={fetchFarms} />);
      expect(wrapper.html()).toBeNull();
    });
  });

  describe('is not loading', () => {
    it('should render FarmListItem', () => {
      const farms = [{ _id: '1' }];
      const wrapper = mount(<HomePage fetchFarms={fetchFarms} farms={farms} />);
      expect(wrapper.find('[data-test="list-item"]').length).toBe(1);
    });

    it('should render FarmCreateForm', () => {
      const wrapper = mount(<HomePage fetchFarms={fetchFarms} />);
      expect(wrapper.find('[data-test="create-form"]').length).toBe(1);
    });
  });
});
