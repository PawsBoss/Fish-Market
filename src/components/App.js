import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        // Setting local storage
        localStorage.setItem(this.props.match.params.storeId,JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    addFish = (fish) => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add new fish
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new updated state
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // 1. Make a copy of the fishes state
        const fishes = {...this.state.fishes};
        // 2. Update the state
        fishes[key] = updatedFish;
        // 3. Set the new state
        this.setState({fishes: fishes});
    };

    removeFish = key => {
        // 1. Make a copy of the state
        const fishes = {...this.state.fishes}
        // 2.update the state - set value to null to delete from firebase
        fishes[key] = null;
        // 3. Update the sate
        this.setState({fishes: fishes})
    };

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };

    addToOrder = (key) => {
        // 1. Copy state
        const order = {...this.state.order};
        // If the order is there +1 otherwise start at 1
        order[key] = order[key] + 1 || 1;
        // Update state
        this.setState({order: order})
    };

    removeFromOrder = key => {
        // 1. Copy State
        const order = {...this.state.order};
        // 2. remove item from the order
        delete order[key];
        // 3. Update the state
        this.setState({order});
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Daily" />
                    <ul className="fishes">
                        { Object.keys(this.state.fishes).map(key =>
                            <Fish
                                key={key}
                                id={key}
                                addToOrder={this.addToOrder}
                                details={this.state.fishes[key]}
                            />)}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder} />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                    />

            </div>
        )
    }
}

export default App;
