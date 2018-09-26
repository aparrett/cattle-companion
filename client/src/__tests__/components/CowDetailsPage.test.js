import React from 'react';
import { shallow } from 'enzyme';
import { CowDetailsPage } from '../../components/CowDetailsPage';

describe('CowDetailsPage', () => {
  let wrapper;
  const cow = { _id: '1', name: 'cow', farm: { _id: '1' } };
  const fetchCow = jest.fn();
  const fetchIncidents = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CowDetailsPage
        fetchCow={fetchCow}
        fetchIncidents={fetchIncidents}
        match={{ params: { id: cow._id } }}
        cow={{}}
      />
    );
  });

  it('should not render anything if cow does not exist', () => {
    expect(wrapper.html()).toEqual(null);
  });

  it('should not render anything if isLoading', () => {
    wrapper.setProps({ isLoading: true, cow });
    expect(wrapper.html()).toEqual(null);
  });

  it('should render error if error is given', () => {
    wrapper.setProps({ error: 'error' });
    expect(wrapper.find('.invalid-feedback').length).toEqual(1);
  });

  it('should render CowDetailsPage without error', () => {
    wrapper.setProps({ cow });

    expect(wrapper.find('div').length).toBeGreaterThan(0);
    expect(wrapper.find('.invalid-feedback').length).toEqual(0);
  });

  it('should call fetchCow with param id', () => {
    expect(fetchCow).toHaveBeenCalledWith(cow._id);
  });

  it('should call fetchIncidents', () => {
    expect(fetchIncidents).toHaveBeenCalled();
  });

  it('should call fetchCow with new id if cow id changes', () => {
    wrapper.setProps({
      cow,
      match: {
        params: {
          id: '2'
        }
      }
    });

    expect(fetchCow).toHaveBeenCalledWith('2');
  });
});
