export const tickClocks = (state) => {
  const activeIDs = state.activeClockIDs;
  // const newClks = activeIDs.reduce((clks, clk) => {
  //
  // }, {});
  const newClks = Object.fromEntries(activeIDs.map((id) => {
    const clk = state.clocks[id];
    const seconds = clk.seconds + 1;
    const markReached = seconds >= clk.timeMark;
    return [
      id,
      {
        seconds,
        markReached,
        isActive: !markReached,
        ...clk,
      }];
  }));
  const updatedActiveIDs = Object.keys(newClks)
    .filter(id => newClks[id].isActive);
  const globalIsTicking = updatedActiveIDs.length > 0;
  return {
    globalClock: {
      period: state.globalClock.period,
      isTicking: globalIsTicking,
    },
    activeClockIDs: updatedActiveIDs,
    clocks: { ...newClks, ...state.clocks },
    ...state,
  };
};

export const stopClockWithID = (state, id) => {
  const newActiveIDs = state.activeClockIDs.filter(_id => _id !== id);
  const globalIsTicking = newActiveIDs.length > 0;
  const stoppedClk = {};
  stoppedClk[id] = { isActive: false, ...state.clocks[id] };
  return {
    globalClock: {
      period: state.globalClock.period,
      isTicking: globalIsTicking,
    },
    activeClockIDs: newActiveIDs,
    clocks: { ...stoppedClk, ...state.clocks },
    ...state,
  };
};
