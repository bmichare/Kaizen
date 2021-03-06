import React from 'react';
import { connect } from 'react-redux';

import AddLogDetails from '../components/AddLogDetails';
import AddNewSkill from '../components/AddNewSkill';
import QuickLog from '../components/QuickLog';

const mapStateToProps = (state) => ({
});

const AddLogContainer = (props) => {

  return (
    <div>
      <AddNewSkill />
      <QuickLog />
    </div>
  );
};

export default connect(mapStateToProps, null)(AddLogContainer);
