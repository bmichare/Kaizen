import React from 'react';
import { connect } from 'react-redux';

import AddLogDetails from '../components/AddLogDetails';
import AddNewSkill from '../components/AddNewSkill';

const mapStateToProps = (state) => ({
});

const AddLogContainer = (props) => {

  return (
    <div>
      <AddLogDetails />
      <AddNewSkill />
    </div>
  );
};

export default connect(mapStateToProps, null)(AddLogContainer);
