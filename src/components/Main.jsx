import React from 'react';


const Winner = ({ winner }) => <div className="winner">Winner is {winner}</div>;

Winner.propTypes = {
  winner: React.PropTypes.string,
};

export default Winner;
