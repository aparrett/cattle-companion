import React from 'react';
import { shallow } from 'enzyme';
import { FarmListItem } from '../../components/FarmListItem';

describe('FarmListItem', () => {
  const farmId = '1';
  const deleteFarm = jest.fn();
  const showConfirmation = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FarmListItem
        farm={{ _id: farmId }}
        deleteFarm={deleteFarm}
        showConfirmation={showConfirmation}
      />
    );
  });

  it('should render', () => {
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should call showConfirmation on delete click', () => {
    wrapper.find('[data-test="delete-farm"]').simulate('click');
    expect(showConfirmation).toHaveBeenCalledWith(farmId, expect.any(String), deleteFarm);
  });
});
