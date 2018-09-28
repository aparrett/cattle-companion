import React from 'react';
import { shallow } from 'enzyme';
import { CowListItem } from '../../components/CowListItem';

describe('CowListItem', () => {
  const cowId = '1';
  const deleteCow = jest.fn();
  const showConfirmation = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CowListItem cow={{ _id: cowId }} deleteCow={deleteCow} showConfirmation={showConfirmation} />
    );
  });

  it('should render', () => {
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should call showConfirmation on delete click', () => {
    wrapper.find('[data-test="delete-cow"]').simulate('click');
    expect(showConfirmation).toHaveBeenCalledWith(cowId, expect.any(String), deleteCow);
  });
});
