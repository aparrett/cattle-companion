import moxios from 'moxios';
import { mockStore } from '../../utils/mockStore';

import * as errorActions from '../../actions/error';
import {  fetchCow, 
          saveCow, 
          editCow, 
          addIncident, 
          deleteCow, 
          fetchEligibleFathers, 
          fetchEligibleMothers, 
          fetchEligibleFathersByFarm, 
          fetchEligibleMothersByFarm } from '../../actions/cattle';

import { ADD_INCIDENT_SUCCESS } from '../../types/incidents';
import {  FETCH_COW_PENDING, 
          FETCH_COW_SUCCESS,
          DELETE_COW_SUCCESS,
          FETCH_ELIGIBLE_FATHERS_SUCCESS,
          FETCH_ELIGIBLE_MOTHERS_SUCCESS } from '../../types/cattle';

describe('actions - cattle', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  errorActions.errorHandler = jest.fn();

  describe('fetchCow', () => {
    it('should dispatch pending action', async done => {
      moxios.stubRequest('/api/cattle/1', { status: 200, response: { name: 'cow' } });

      const expectedAction = { type: FETCH_COW_PENDING };

      const store = mockStore();
      await store.dispatch(fetchCow(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should dispatch success action on success', async done => {
      moxios.stubRequest('/api/cattle/1', { status: 200, response: { name: 'cow' } });

      const expectedAction = { type: FETCH_COW_SUCCESS, payload: { name: 'cow' } };

      const store = mockStore();
      await store.dispatch(fetchCow(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/cattle/1', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchCow(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('saveCow', () => {
    it('should push new route to history', async done => {
      const cowId = '3';
      moxios.stubRequest('/api/farms/1/cattle', { status: 201, response: { _id: cowId } });

      const store = mockStore();
      const history = { push: jest.fn() };
      const cow = { 
        name: 'cow', 
        gender: 'bull', 
        dateOfBirth: new Date(), 
        farm: '1',
        mother: '1',
        father: '2',
      };

      await store.dispatch(saveCow(cow, history));

      expect(history.push).toHaveBeenCalled();
      expect(history.push.mock.calls[0][0]).toEqual(`/farms/${cow.farm}/cattle/${cowId}`);

      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/farms/1/cattle', { status: 500 });

      const store = mockStore();
      const history = { push: jest.fn() };
      const cow = { 
        name: 'cow', 
        gender: 'bull', 
        dateOfBirth: new Date(), 
        farm: '1',
        mother: '1',
        father: '2',
      };

      await store.dispatch(saveCow(cow, history));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('editCow', () => {
    it('should push new route to history', async done => {
      const cow = { 
        _id: '3',
        name: 'cow', 
        gender: 'bull', 
        dateOfBirth: new Date(), 
        farm: '1',
        mother: '1',
        father: '2',
      };

      moxios.stubRequest('/api/cattle/3', { status: 201, response: { _id: cow._id } });

      const store = mockStore();
      const history = { push: jest.fn() };

      await store.dispatch(editCow(cow, history));

      expect(history.push).toHaveBeenCalled();
      expect(history.push.mock.calls[0][0]).toEqual(`/farms/${cow.farm}/cattle/${cow._id}`);

      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/cattle/3', { status: 500 });

      const store = mockStore();
      const history = { push: jest.fn() };
      const cow = { 
        _id: '3',
        name: 'cow', 
        gender: 'bull', 
        dateOfBirth: new Date(), 
        farm: '1',
        mother: '1',
        father: '2',
      };

      await store.dispatch(editCow(cow, history));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('addIncident', () => {
    it('should dispatch success action on success', async done => {
      const cow = { _id: '1', incidents: [] };
      const incident = { name: 'incident' };
      const expectedAction = { type: ADD_INCIDENT_SUCCESS, payload: incident };

      moxios.stubRequest('/api/cattle/1', { status: 200, response: incident });

      const store = mockStore();
      await store.dispatch(addIncident(cow, incident));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      const cow = { _id: '1', incidents: [] };
      const incident = { name: 'incident' };

      moxios.stubRequest('/api/cattle/1', { status: 500 });

      const store = mockStore();
      await store.dispatch(addIncident(cow, incident));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('deleteCow', () => {
    it('should dispatch success action on success', async done => {
      moxios.stubRequest('/api/cattle/1', { status: 200 });
      
      const expectedAction = { type: DELETE_COW_SUCCESS, payload: 1 };
      const store = mockStore();
      await store.dispatch(deleteCow(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/cattle/1', { status: 500 });

      const store = mockStore();
      await store.dispatch(deleteCow(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchEligibleFathers', () => {
    it('should dispatch success action on success', async done => {
      const eligibleFather = { name: 'bull' };
      moxios.stubRequest('/api/cattle/1/eligible-fathers', { status: 200, response: eligibleFather });
      
      const expectedAction = { type: FETCH_ELIGIBLE_FATHERS_SUCCESS, payload: eligibleFather };
      const store = mockStore();
      await store.dispatch(fetchEligibleFathers(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/cattle/1/eligible-fathers', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchEligibleFathers(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchEligibleMothers', () => {
    it('should dispatch success action on success', async done => {
      const eligibleMother = { name: 'cow' };
      moxios.stubRequest('/api/cattle/1/eligible-mothers', { status: 200, response: eligibleMother });
      
      const expectedAction = { type: FETCH_ELIGIBLE_MOTHERS_SUCCESS, payload: eligibleMother };
      const store = mockStore();
      await store.dispatch(fetchEligibleMothers(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/cattle/1/eligible-mothers', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchEligibleMothers(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchEligibleFathersByFarm', () => {
    it('should dispatch success action on success', async done => {
      const eligibleFather = { name: 'cow' };
      moxios.stubRequest('/api/farms/1/cattle/eligible-fathers', { status: 200, response: eligibleFather });
      
      const expectedAction = { type: FETCH_ELIGIBLE_FATHERS_SUCCESS, payload: eligibleFather };
      const store = mockStore();
      await store.dispatch(fetchEligibleFathersByFarm(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/farms/1/cattle/eligible-fathers', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchEligibleFathersByFarm(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchEligibleMothersByFarm', () => {
    it('should dispatch success action on success', async done => {
      const eligibleMother = { name: 'cow' };
      moxios.stubRequest('/api/farms/1/cattle/eligible-mothers', { status: 200, response: eligibleMother });
      
      const expectedAction = { type: FETCH_ELIGIBLE_MOTHERS_SUCCESS, payload: eligibleMother };
      const store = mockStore();
      await store.dispatch(fetchEligibleMothersByFarm(1));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/farms/1/cattle/eligible-mothers', { status: 500 });

      const store = mockStore();
      await store.dispatch(fetchEligibleMothersByFarm(1));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });
});