import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
});

const Log = (props) => {
  const {logs, logIndex, deleteLogClickHandler} = props;

  return (
    <div className='LogComponent'>
      <button onClick={() => deleteLogClickHandler(logIndex)}>x</button>
      {logs[logIndex].date}: 
      {`    ${logs[logIndex].hours} hours ${logs[logIndex].minutes} minutes`}
      {logs[logIndex].notes} 
    </div>
  );
};

export default connect(mapStateToProps, null)(Log);
