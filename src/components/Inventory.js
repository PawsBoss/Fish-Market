import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {

    // create state
    static propTypes ={
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        removeFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user=> {
            this.authHandler({user});
        });
    }

    authHandler = async authData => {
        // 1. Look up the current store in the firebase db
        const store = await base.fetch(this.props.storeId, { context: this });
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };


    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };



    logout = async () => {
        await firebase.auth().signOut();
        this.setState({uid: null});

    };

    render() {

        const logout = <button onClick={this.logout}>Log out!</button>

        // 1. Check if they are loged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        // 2. Check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner of this store</p>
                    {logout}
                </div>
            );
        }

        //3. They must be the owner, just render out the inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        id={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        removeFish={this.props.removeFish}/>
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Samples</button>
            </div>
        )
    }
}

export default Inventory;
