import moxios from 'moxios';
import cookie from '../../utils/cookie';
import { mockStore } from '../../utils/mockStore';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, CLEAR_AUTH_ERROR } from '../../types/auth';
import { registerUser, loginUser, fetchUser, clearAuthError, logoutUser } from '../../actions/auth';
import * as errorActions from '../../actions/error';

jest.mock('../../utils/cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn()
}));

errorActions.errorHandler = jest.fn();

describe('actions - auth', () => {
  beforeEach(() => moxios.install());

  afterEach(() => {
    jest.clearAllMocks();
    moxios.uninstall();
  });

  describe('registerUser', () => {
    it('should dispatch the auth action on success', async done => {
      moxios.stubRequest('/api/users', { status: 201, response: { user: { name: 'user' } } });

      const expectedAction = { type: AUTH_USER, payload: { name: 'user' } };

      const store = mockStore();
      await store.dispatch(registerUser({ name: 'user' }));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call the set method on cookie with proper params', async done => {
      moxios.stubRequest('/api/users', { 
        status: 201, 
        response: { token: 'userToken', user: { name: 'user' } } 
      });

      const store = mockStore();
      await store.dispatch(registerUser({ name: 'user' }));

      expect(cookie.set).toHaveBeenCalled();
      expect(cookie.set.mock.calls[0][0]).toBe('token');
      expect(cookie.set.mock.calls[0][1]).toBe('userToken');
      expect(cookie.set.mock.calls[0][2]).toEqual({ path: '/' });

      done();
    });

    it('should call the callback function if it is given', async done => {
      moxios.stubRequest('/api/users', { status: 201, response: { user: { name: 'user' } } });

      const callback = jest.fn();
      const store = mockStore();
      await store.dispatch(registerUser({ name: 'user' }, callback));

      expect(callback).toHaveBeenCalled();
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/users', { status: 500 });

      const store = mockStore();
      await store.dispatch(registerUser({ name: 'user' }));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('loginUser', () => {
    it('should dispatch the auth action on success', async done => {
      moxios.stubRequest('/api/auth', { status: 200, response: { user: { name: 'user' } } });

      const expectedAction = { type: AUTH_USER, payload: { name: 'user' } };

      const store = mockStore();
      await store.dispatch(loginUser({ name: 'user' }));

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should call the set method on cookie with proper params', async done => {
      moxios.stubRequest('/api/auth', { 
        status: 200, 
        response: { token: 'userToken', user: { name: 'user' } } 
      });

      const store = mockStore();
      await store.dispatch(loginUser({ name: 'user' }));

      expect(cookie.set).toHaveBeenCalled();
      expect(cookie.set.mock.calls[0][0]).toBe('token');
      expect(cookie.set.mock.calls[0][1]).toBe('userToken');
      expect(cookie.set.mock.calls[0][2]).toEqual({ path: '/' });

      done();
    });

    it('should call the callback function if it is given', async done => {
      moxios.stubRequest('/api/auth', { status: 200, response: { user: { name: 'user' } } });

      const callback = jest.fn();
      const store = mockStore();
      await store.dispatch(loginUser({ name: 'user' }, callback));

      expect(callback).toHaveBeenCalled();
      done();
    });

    it('should call errorHandler on error', async done => {
      moxios.stubRequest('/api/auth', { status: 500 });

      const store = mockStore();
      await store.dispatch(loginUser({ name: 'user' }));

      expect(errorActions.errorHandler).toHaveBeenCalled();
      done();
    });
  });

  describe('fetchUser', () => {
    it('should dispatch the auth action on success', async done => {
      moxios.stubRequest('/api/me', { status: 200, response: { user: { name: 'user' } } });

      const expectedAction = { type: AUTH_USER, payload: { name: 'user' } };

      const store = mockStore();
      await store.dispatch(fetchUser());

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });

    it('should dispatch unauth action on error', async done => {
      moxios.stubRequest('/api/me', { status: 500 });

      const expectedAction = { type: UNAUTH_USER };
      const history = { push: jest.fn() };

      const store = mockStore();
      await store.dispatch(fetchUser(history));

      expect(store.getActions()).toContainEqual(expectedAction);

      done();
    });

    it('should call remove function on error', async done => {
      moxios.stubRequest('/api/me', { status: 500 });

      const history = { push: jest.fn() };

      const store = mockStore();
      await store.dispatch(fetchUser(history));

      expect(cookie.remove).toHaveBeenCalled();
      expect(cookie.remove.mock.calls[0][0]).toBe('token');
      expect(cookie.remove.mock.calls[0][1]).toEqual({ path: '/' });
      
      done();
    });

    it('should call push function on error', async done => {
      moxios.stubRequest('/api/me', { status: 500 });

      const history = { push: jest.fn() };

      const store = mockStore();
      await store.dispatch(fetchUser(history));
      
      expect(history.push).toHaveBeenCalled();
      expect(history.push.mock.calls[0][0]).toEqual('/login');
      
      done();
    });
  });

  describe('clearAuthError', () => {
    it('should dispatch the clear auth error action', async done => {
      const expectedAction = { type: CLEAR_AUTH_ERROR };

      const store = mockStore();
      await store.dispatch(clearAuthError());

      expect(store.getActions()).toContainEqual(expectedAction);
      done();
    });
  });

  describe('logoutUser', () => {
    it('should dispatch unauth action', async done => {
      const expectedAction = { type: UNAUTH_USER };
      const history = { push: jest.fn() };

      const store = mockStore();
      await store.dispatch(logoutUser(history));

      expect(store.getActions()).toContainEqual(expectedAction);

      done();
    });

    it('should call remove function', async done => {
      const history = { push: jest.fn() };

      const store = mockStore();
      await store.dispatch(logoutUser(history));

      expect(cookie.remove).toHaveBeenCalled();
      expect(cookie.remove.mock.calls[0][0]).toBe('token');
      expect(cookie.remove.mock.calls[0][1]).toEqual({ path: '/' });
      
      done();
    });

    it('should call push function', async done => {
      const history = { push: jest.fn() };

      const store = mockStore();
      await store.dispatch(logoutUser(history));
      
      expect(history.push).toHaveBeenCalled();
      expect(history.push.mock.calls[0][0]).toEqual('/login');
      
      done();
    });
  });
});