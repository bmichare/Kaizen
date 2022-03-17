import React from 'react';
import { connect } from 'react-redux';

import SummaryContainer from './containers/SummaryContainer';
import AddLogContainer from './containers/AddLogContainer';

const App = (props) => {
  return (
    <div>
      <SummaryContainer />
      <AddLogContainer />
    </div>
  );
};

export default connect(null, null)(App);
