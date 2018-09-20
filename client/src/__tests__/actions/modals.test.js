import { mockStore } from '../../utils/mockStore';
import { showAddIncident, showConfirmation, hideModal } from '../../actions/modals';
import {  SHOW_MODAL, 
          HIDE_MODAL, 
          ADD_INCIDENT_MODAL, 
          CONFIRMATION_MODAL } from '../../types/modal';

describe('actions - modals', () => {
  describe('showAddIncident', () => {
    it('should dispatch the correct action', async () => {
      const expectedActions = [{
        type: SHOW_MODAL,
        modalType: ADD_INCIDENT_MODAL,
        modalProps: { cow: { name: 'cow' } }
      }];

      const store = mockStore();
      await store.dispatch(showAddIncident({ name: 'cow' }));
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('showConfirmation', () => {
    it('should dispatch the correct action', async () => {
      const expectedActions = [{
        type: SHOW_MODAL,
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          id: 1,
          title: 'title',
          action: 'action'
        }
      }];
      
      const store = mockStore();
      await store.dispatch(showConfirmation(1, 'title', 'action'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('hideModal', () => {
    it('should dispatch the correct action', async () => {
      const expectedActions = [{ type: HIDE_MODAL }];
      const store = mockStore();
      await store.dispatch(hideModal());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});          
