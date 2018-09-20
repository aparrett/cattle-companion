import moxios from 'moxios';
import { mockStore } from '../../utils/mockStore';
import { saveFarm, fetchFarm, fetchFarms, deleteFarm } from '../../actions/farms';
import * as errorActions from '../../actions/error';

import {  SAVE_FARM_SUCCESS, 
          FETCH_FARM_PENDING,
          FETCH_FARM_SUCCESS,
          FETCH_FARMS_PENDING,
          FETCH_FARMS_SUCCESS,
          DELETE_FARM_SUCCESS } from '../../types/farms';

describe('actions - farms', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  errorActions.errorHandler = jest.fn();

  describe('saveFarm', () => {
    it('should dispatch proper action on success', async done => {
      moxios.stubRequest('/api/farms', { status: 201, response: [{ name: 'farm' }] });

      const expectedActions = [{
        type: SAVE_FARM_SUCCESS,
        payload: [{ name: 'farm' }]
      }];

      const store = mockStore();
      await store.dispatch(saveFarm({ name: 'farm' }));

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/farms', { status: 500 });

      const store = mockStore();
      await store.dispatch(saveFarm({ name: 'farm' }));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchFarm', () => {
    it('should dispatch pending action', async done => {
      moxios.stubRequest('/api/farms/1', { status: 200, response: [{ name: 'farm' }] });

      const expectedAction = { type: FETCH_FARM_PENDING };

      const store = mockStore();
      await store.dispatch(fetchFarm(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should dispatch success action on success', async done => {
      moxios.stubRequest('/api/farms/1', { status: 200, response: [{ name: 'farm' }] });

      const expectedAction = { type: FETCH_FARM_SUCCESS, payload: [{ name: 'farm' }] };

      const store = mockStore();
      await store.dispatch(fetchFarm(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/farms/1', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchFarm(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchFarms', () => {
    it('should dispatch pending action', async done => {
      moxios.stubRequest('/api/me/farms', { status: 200, response: [{ name: 'farm' }] });

      const expectedAction = { type: FETCH_FARMS_PENDING };

      const store = mockStore();
      await store.dispatch(fetchFarms());

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should dispatch success action on success', async done => {
      moxios.stubRequest('/api/me/farms', { status: 200, response: [{ name: 'farm' }] });

      const expectedAction = { type: FETCH_FARMS_SUCCESS, payload: [{ name: 'farm' }] };

      const store = mockStore();
      await store.dispatch(fetchFarms());

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/me/farms', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchFarms());

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('deleteFarm', () => {
    it('should dispatch success action on success', async done => {
      moxios.stubRequest('/api/farms/1', { status: 204 });

      const expectedAction = { type: DELETE_FARM_SUCCESS, payload: 1 };

      const store = mockStore();
      await store.dispatch(deleteFarm(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/farms/1', { status: 500 });

      const store = mockStore();
      await store.dispatch(deleteFarm(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });
});