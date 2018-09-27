import { mockStore } from '../../utils/mocks';

import { dismissError, errorHandler } from '../../actions/error';
import { DISMISS_ERROR } from '../../types/error';

describe('actions - error', () => {
  describe('dismissError', () => {
    it('should dispatch proper action', async () => {
      const expectedAction = { type: DISMISS_ERROR };
      const store = mockStore();

      await store.dispatch(dismissError());

      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  describe('errorHandler', () => {
    it('should dispatch action with given type and error if status is 400', async () => {
      const expectedAction = { type: 'invalid_data', payload: 'invalid data' };
      const store = mockStore();

      await store.dispatch(dispatch => errorHandler(dispatch, 'invalid_data', 400, 'invalid data'));

      expect(store.getActions()).toContainEqual(expectedAction);
    });

    it('should dispatch action with given type and specific payload if status is 401', async () => {
      const expectedAction = {
        type: 'unauth',
        payload: 'You are not authorized to perform this action.'
      };

      const store = mockStore();
      await store.dispatch(dispatch => errorHandler(dispatch, 'unauth', 401, 'Unauthorized'));

      expect(store.getActions()).toContainEqual(expectedAction);
    });

    it('should dispatch action with given type and specific payload if status is 404', async () => {
      const expectedAction = {
        type: 'not_found',
        payload: 'Not found.'
      };

      const store = mockStore();
      await store.dispatch(dispatch => errorHandler(dispatch, 'not_found', 404, 'Cow not found.'));

      expect(store.getActions()).toContainEqual(expectedAction);
    });

    it('should dispatch action with given type and specific payload if status is not 400, 401, or 404', async () => {
      const expectedAction = {
        type: 'server_error',
        payload: 'Could not perform action at this time. Please try again later.'
      };

      const store = mockStore();
      await store.dispatch(dispatch => errorHandler(dispatch, 'server_error', 500, 'Oops.'));

      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });
});
