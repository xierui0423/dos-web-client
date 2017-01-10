import React from 'react';
import { connect } from 'react-redux';
import LoadingModalContainer from '../components/loading/element.jsx';


const Main = props => (
    <div className="main-wrapper">
        <LoadingModalContainer />
        {props.children}
    </div>
    );

Main.propTypes = {
    // eslint-disable-next-line
    children: React.PropTypes.object,
};


const MainContainer = connect()(Main);

export default MainContainer;