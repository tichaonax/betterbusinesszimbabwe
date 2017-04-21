import React from 'react';
import {connect} from 'react-redux';
import BbzSearch from '../components/BbzSearch';
import BbzList from '../components/BbzList';
import AddBbzItem from '../components/AddBbzItem';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="text-center page-title">Home</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-6">
                        <div className="container ">
                            <BbzSearch/>
                            <BbzList/>
                            <AddBbzItem/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Home)
