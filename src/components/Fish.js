import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';


class Fish extends React.Component {
    // Declaring the propsTypes for all the fish - Static makes it live on the mama component
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func
    }

    render() {

        const {image, name, price, desc,status} = this.props.details;
        const isAvailable = status === 'available';
        return (
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fisn-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button
                    onClick={() => this.props.addToOrder(this.props.id)}
                    disabled={!isAvailable} >
                    {isAvailable ? 'Add To Cart': 'Sold Out!'}
                </button>
            </li>
        );
    }
}

export default Fish;
