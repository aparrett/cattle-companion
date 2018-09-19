import { mockStore } from '../../utils/mockStore';
import { showAddIncident, showConfirmation, hideModal } from '../../actions/modals';
import { SHOW_MODAL, 
    HIDE_MODAL, 
    ADD_INCIDENT_MODAL, 
    CONFIRMATION_MODAL } from '../../types/modal';

describe('showAddIncident', () => {
  it('should dispatch the correct action', async () => {
    const store = mockStore();
    await store.dispatch(showAddIncident({ name: 'cow' }));
    
    const action = store.getActions()[0];

    expect(action.type).toEqual(SHOW_MODAL);
    expect(action.modalType).toEqual(ADD_INCIDENT_MODAL);
    expect(action.modalProps).toEqual({ cow: { name: 'cow' } });
  });
});

describe('showConfirmation', () => {
  it('should dispatch the correct action', async () => {
    const store = mockStore();
    await store.dispatch(showConfirmation(1, 'title', 'action'));

    const action = store.getActions()[0];

    expect(action.type).toEqual(SHOW_MODAL);
    expect(action.modalType).toEqual(CONFIRMATION_MODAL);
    expect(action.modalProps).toEqual({
      id: 1,
      title: 'title',
      action: 'action'
    });
  });
});

describe('hideModal', () => {
  it('should dispatch the correct action', async () => {
    const store = mockStore();
    await store.dispatch(hideModal());

    const action = store.getActions()[0];

    expect(action.type).toEqual(HIDE_MODAL);
  });
});