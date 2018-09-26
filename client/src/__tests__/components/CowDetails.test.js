import React from 'react';
import { shallow } from 'enzyme';
import { CowDetails } from '../../components/CowDetails';

describe('CowDetails', () => {
  let wrapper;
  const cow = { _id: '1', name: 'cow', farm: { _id: '1' } };
  const showConfirmation = jest.fn();
  const deleteCow = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CowDetails cow={cow} showConfirmation={showConfirmation} deleteCow={deleteCow} />
    );
  });

  it('should render', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call showConfirmation with correct params on .delete-cow click', () => {
    wrapper.find('.delete-cow').simulate('click');
    expect(showConfirmation).toHaveBeenCalledWith(
      cow._id,
      expect.any(String),
      expect.any(Function)
    );
  });
});
