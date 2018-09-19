import { mockStore } from '../../utils/mockStore';
import { fetchIncidents } from '../../actions/incidents';
import { FETCH_INCIDENTS_SUCCESS } from '../../types/incidents';
import moxios from 'moxios';

beforeEach(() => moxios.install());
afterEach(() => moxios.uninstall());

describe('fetchIncidents', () => {
  it('should dispatch the correct action', async (done) => {
    moxios.stubRequest('/api/incidents', {
      status: 200,
      response: [{ name: 'Assisted Delivery' }, { name: 'Twins' }]
    });

    const expectedActions = [{
      type: FETCH_INCIDENTS_SUCCESS,
      payload: [{ name: 'Assisted Delivery' }, { name: 'Twins' }]
    }];

    const store = mockStore();
    await store.dispatch(fetchIncidents());
    
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});