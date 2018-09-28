// mergeProps is used as a third argument to the connect function
// to overwrite action creators with mocks when testing.
export const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps);
