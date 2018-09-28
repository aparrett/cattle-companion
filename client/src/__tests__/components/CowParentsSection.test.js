import React from 'react';
import { shallow } from 'enzyme';
import CowParentsSection from '../../components/CowParentsSection';

describe('CowParentsSection', () => {
  it('should render', () => {
    const cow = { _id: '1', name: 'cow' };
    const wrapper = shallow(<CowParentsSection cow={cow} />);
    expect(wrapper.html()).not.toBeNull();
  });

  describe('cow has no parents', () => {
    const cow = { _id: '1', name: 'cow' };

    it('should contain no-parents element', () => {
      const wrapper = shallow(<CowParentsSection cow={cow} />);
      expect(wrapper.find('[data-test="no-parents"]').length).toEqual(1);
    });

    it('should not contain parents-list element', () => {
      const wrapper = shallow(<CowParentsSection cow={cow} />);
      expect(wrapper.find('[data-test="parents-list"]').length).toEqual(0);
    });
  });

  describe('cow has a mother', () => {
    const cow = {
      _id: '1',
      name: 'cow',
      mother: { _id: '2', name: 'mother' }
    };

    it('should not contain no-parents element', () => {
      const wrapper = shallow(<CowParentsSection cow={cow} />);
      expect(wrapper.find('[data-test="no-parents"]').length).toEqual(0);
    });

    it('should contain mother element', () => {
      const wrapper = shallow(<CowParentsSection cow={cow} />);
      expect(wrapper.find('li').length).toEqual(1);
    });
  });

  describe('cow has a father', () => {
    const cow = {
      _id: '1',
      name: 'cow',
      father: { _id: '2', name: 'father' }
    };

    it('should not contain no-parents element', () => {
      const wrapper = shallow(<CowParentsSection cow={cow} />);
      expect(wrapper.find('[data-test="no-parents"]').length).toEqual(0);
    });

    it('should contain father element', () => {
      const wrapper = shallow(<CowParentsSection cow={cow} />);
      expect(wrapper.find('li').length).toEqual(1);
    });
  });
});
