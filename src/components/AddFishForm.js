import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component{
    nameref =React.createRef();
    priceref=React.createRef();
    statusref=React.createRef();
    descref=React.createRef();
    imageref=React.createRef();

    static propTypes = ({
        addFish: PropTypes.func
    })
    createFish = event => {
        event.preventDefault();
        const fish = {
            name : this.nameref.current.value,
            price : parseFloat(this.priceref.current.value),
            status : this.statusref.current.value,
            desc : this.descref.current.value,
            image : this.imageref.current.value
        }
        // pass the data to required method to populate state in App.js
        this.props.addFish(fish);
        // Clear the form.
        event.currentTarget.reset();
    }
    render() {
        return (
            <form className="fish-edit" onSubmit = {this.createFish}>
                <input name="name" ref = {this.nameref} type = "text" placeholder="Name" / >
                <input name="price" ref = {this.priceref} type = "text" placeholder="Price" / >
                <select name="status"  ref = {this.statusref}>
                    <option value = "Available">Fresh</option>
                    <option value = "Unavailable">Sold Out!</option>
                </select>
                <textarea name="desc"  ref = {this.descref} type = "text" placeholder="Description" / >
                <input name="image"  ref = {this.imageref} type = "text" placeholder="Image" / >
                <button type="submit">Submit</button>
            </form>
        );
    }
}


export default AddFishForm;