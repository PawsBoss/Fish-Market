import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

// Every component needs to be its own class
class StorePicker extends React.Component {

    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    };

    goToStore = (event) => {
        // 1. Stop the form from submitting
        event.preventDefault();

        // Get the value for input by using myInput.value.value
        // Since we are inside a the Router Component we have access to it methods
        // We use the push method to change the url
        this.props.history.push(`/store/${this.myInput.value.value}`);
    }

// Every class needs atleast one method render()
    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                <h1>Please Enter Store Name</h1>
                <input
                    type="text"
                    ref={this.myInput}
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                    required
                    />
                <button type="submit">Visit Store</button>
            </form>
        );
    }

}


export default StorePicker;
