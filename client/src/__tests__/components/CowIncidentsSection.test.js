import React from 'react';
import { mount } from 'enzyme';
import { CowIncidentsSection } from '../../components/CowIncidentsSection';

describe('CowIncidentsSection', () => {
  let wrapper;
  const cow = { _id: '1', name: 'cow', farm: { _id: '1' } };
  const showAddIncident = jest.fn();

  beforeEach(() => {
    wrapper = mount(<CowIncidentsSection cow={cow} showAddIncident={showAddIncident} />);
  });

  afterEach(() => wrapper.unmount());

  it('should render', () => {
    expect(wrapper.html()).not.toEqual(null);
  });

  it('should render CowIncidentList', () => {
    expect(wrapper.find('CowIncidentList').length).toBe(1);
  });
});
