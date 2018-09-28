import React from 'react';
import { shallow, mount } from 'enzyme';
import { FarmDetailsPage } from '../../components/FarmDetailsPage';
import { MemoryRouter } from 'react-router-dom';
import Root from '../../Root';

jest.mock('../../components/CowListItem', () => () => <li />);

describe('FarmDetailsPage', () => {
  const match = { params: { id: '1' } };
  const fetchFarm = jest.fn();
  const farm = { _id: '1', name: 'farm', cattle: [{ _id: '1', name: 'cow' }] };

  it('should render null if farm not given', () => {
    const wrapped = shallow(
      <FarmDetailsPage isLoading={false} match={match} fetchFarm={fetchFarm} />
    );
    expect(wrapped.html()).toBeNull();
  });

  it('should render null if isLoading', () => {
    const wrapped = shallow(
      <FarmDetailsPage farm={farm} match={match} fetchFarm={fetchFarm} isLoading />
    );
    expect(wrapped.html()).toBeNull();
  });

  it('should render when farm given and not loading', () => {
    const wrapped = mount(
      <Root>
        <MemoryRouter>
          <FarmDetailsPage farm={farm} match={match} fetchFarm={fetchFarm} isLoading={false} />
        </MemoryRouter>
      </Root>
    );
    expect(wrapped.html()).not.toBeNull();
    expect(wrapped.find('li').length).toBe(1);
  });
});
