import React from 'react';

export const BarSeparator = () => <span className="time-disp__separator--bar" />;

export const DotSeparator = () => (
  <div className="time-disp__separator-wrpr">
    <span className="time-disp__separator--dot" />
    <span className="time-disp__separator--dot" />
  </div>
);
