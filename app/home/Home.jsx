import React from 'react';
import {connect} from 'react-redux';
import BbzSearch from 'BbzSearch';
import BbzList from 'BbzList';
import AddBbzItem from 'AddBbzItem';

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
        isLoggedIn: state.auth.loggedIn,
        reviewItems: state.reviewItems,
    }
}

export default connect(mapStateToProps)(Home)
