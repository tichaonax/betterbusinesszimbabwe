import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');
import moment from 'moment';

import firebase, {firebaseRef} from 'app/firebase';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {

    it('should generate a search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Welcome'
        };

        var response = actions.setSearchText(action.searchText);
        expect(response).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };

        var response = actions.togggleShowCompletedItem();
        expect(response).toEqual(action);
    });

    describe('firebase authentication', () => {

        it('should generate a login action', () => {

            const auth = {
                uid: 'KYZCgUasdqGdfdf9KZaM797iYUnIA2',
                displayName: "Tichaona Hwandaza"
            };
            const action = {
                type: 'BBZ_LOGIN',
                auth: auth
            };

            const response = actions.bbzLogin(auth);
            expect(response).toEqual(action);
        });

        it('should generate a logout action', () => {

            var action = {
                type: 'BBZ_LOGOUT',
            };

            const response = actions.bbzLogout();
            expect(response).toEqual(action);
        });

    })

    describe('Tests with firebase database userProfiles', () => {

        //this test requires that the data exists on the firebase database
        const email = "tichaona@yahoo.com";
        const displayName = "Tichaona Hwandaza";

        var testProfileRef;
        var testProfile = {
            displayName: displayName,
            email: email,
            createDate: moment().unix()
        };

        var uid;
        var profileRef;


        beforeEach((done) => {
            firebase.auth().signInAnonymously().then((user) => {

                uid = user.uid;
                profileRef = firebaseRef.child(`users/${uid}`);

                return profileRef.remove();
            }).then(() => {
                testProfileRef = profileRef.push();
                return profileRef.update({userProfile: testProfile});
            }).then(() => done())
                .catch(done);
        });

        afterEach((done) => {
            //use this delete the test data from fire base
            profileRef.remove().then(() => done());
        });


        it('should create a user profile and dispatch ADD_USER_PROFILE', (done) => {

            const store = createMockStore({auth: {uid}});

            store.dispatch(actions.startAddUserProfile(email, displayName)).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toInclude({
                    type: 'ADD_USER_PROFILE'
                });

                expect(actions[0].profile).toInclude({
                    email: email
                });

                done(); //test is done--- increase timeout in karma configuration file if needed
            }).catch(done)

        });

        it('should dispatch SET_USER_PROFILE', (done) => {

            const store = createMockStore({auth: {uid}});

            store.dispatch(actions.startSetUserProfile()).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toInclude({
                    type: 'SET_USER_PROFILE'
                });

                expect(actions[0].profile).toInclude({
                    email: email
                });

                expect(actions[0].profile.email).toEqual(email);
                expect(actions[0].profile.displayName).toEqual(displayName);
                expect(actions[0].profile.createDate).toBeGreaterThan(0);

                done(); //test is done--- increase timeout in karma configuration file if needed
            }).catch(done)

        });

        it('should call startLastLogin dispatch ADD_LAST_LOGIN', (done) => {

            const store = createMockStore({auth: {uid}});

            store.dispatch(actions.startLastLogin()).then(() => {
                const actions = store.getActions();

                expect(actions[0]).toInclude({
                    type: 'ADD_LAST_LOGIN'
                });

                done(); //test is done--- increase timeout in karma configuration file if needed
            }).catch(done)


        });

    })

})

