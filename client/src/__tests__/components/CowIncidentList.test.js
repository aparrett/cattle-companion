import React from 'react';
import { shallow } from 'enzyme';
import CowIncidentList from '../../components/CowIncidentList';

describe('CowIncidentList', () => {
  it('should not have list items if no incidents given', () => {
    const wrapper = shallow(<CowIncidentList incidents={[]} />);
    expect(wrapper.find('li').length).toBe(0);
  });

  it('should have list items if incidents given', () => {
    const incidents = [{ name: 'incident' }];
    const wrapper = shallow(<CowIncidentList incidents={incidents} />);
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should render items in ascending order by date', () => {
    const incidents = [
      { name: 'incident2', date: '08/09/18' },
      { name: 'incident1', date: '08/08/18' }
    ];
    const wrapper = shallow(<CowIncidentList incidents={incidents} />);

    const item1 = wrapper
      .find('li')
      .at(0)
      .html();

    const item2 = wrapper
      .find('li')
      .at(1)
      .html();

    expect(item1).toContain('08/08/18');
    expect(item2).toContain('08/09/18');
  });
});
