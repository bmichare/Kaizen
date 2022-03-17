import React from 'react';
import { connect } from 'react-redux';

import Log from './Log';

const mapStateToProps = (state) => ({
});

const Subskill = (props) => {
  return (
    <div>
      <Log />
    </div>
  );
};

export default connect(mapStateToProps, null)(Subskill);
