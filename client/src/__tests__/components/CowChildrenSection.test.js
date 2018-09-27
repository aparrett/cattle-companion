import React from 'react';
import { shallow } from 'enzyme';
import CowChildrenSection from '../../components/CowChildrenSection';
import { sel } from '../../utils/testing';

describe('CowChildrenSection', () => {
  it('should render', () => {
    const cow = { name: 'cow' };
    const wrapper = shallow(<CowChildrenSection cow={cow} />);
    expect(wrapper.html()).not.toBeNull();
  });

  describe('cow has no children', () => {
    const cow = { name: 'cow' };

    it('should render no-children element', () => {
      const wrapper = shallow(<CowChildrenSection cow={cow} />);
      expect(wrapper.find(sel('no-children')).length).toBe(1);
    });

    it('should not render children-list element', () => {
      const wrapper = shallow(<CowChildrenSection cow={cow} />);
      expect(wrapper.find(sel('children-list')).length).toBe(0);
    });
  });

  describe('cow has children', () => {
    const cow = { _id: '1', name: 'cow', children: [{ _id: '2', name: 'child' }] };

    it('should not render no-children element', () => {
      const wrapper = shallow(<CowChildrenSection cow={cow} />);
      expect(wrapper.find(sel('no-children')).length).toBe(0);
    });

    it('should contain child element', () => {
      const wrapper = shallow(<CowChildrenSection cow={cow} />);
      expect(wrapper.find('li').length).toBe(1);
    });
  });
});
