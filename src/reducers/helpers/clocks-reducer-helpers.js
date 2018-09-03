const getActiveClocks = state => state.clocks.filter(clk => clk.isActive);

export const stopClockWithID = (state, id) => {
  // Set isActive of clock with given id to false
  const clocks = state.clocks.map(clk => (clk.id === id
    ? { ...clk, isActive: false }
    : clk
  ));
  // Merge clocks into state & change isTicking to false if no active clocks
  return { ...state, clocks, isTicking: getActiveClocks(state).length > 0 };
};

export const tickClocks = (state) => {
  // NOTE: This could probably be more efficient in a single map func,
  // but considering its complexity that will be differed.
  // debugger; // eslint-disable-line
  // First get the clocks that won't change to be merged later
  const inactiveClocks = state.clocks.filter(clk => !clk.isActive);

  // Then get all active clocks...
  const activeClocks = getActiveClocks(state)
    // Increment active clocks.
    .map(clk => ({ ...clk, seconds: clk.seconds + 1 }));

  // Out of the clocks that have reached their mark...
  const expiredClocks = activeClocks.filter(clk => clk.seconds >= clk.timeMark)
    // Set their isActive property to false, and markReached true
    .map(clk => ({ ...clk, isActive: false, markReached: true }));

  // Collect the IDs of the expired clocks...
  expiredClocks.map(clk => clk.id)
  // Remove from activeClocks each ID of an expired clock
    .forEach(id =>
      activeClocks.splice(activeClocks.findIndex(clk => clk.id === id), 1));

  // // Then re-obtain the activeClocks since it could've changed after expiration
  // activeClocks = activeClocks.filter(clk => clk.isActive);
  // Then finally merge the clocks together and merge clocks with state...
  // ... and change isTicking state if the newly active clocks is 0
  return {
    ...state,
    isTicking: activeClocks.length > 0,
    clocks: [...activeClocks, ...expiredClocks, ...inactiveClocks],
  };
};
