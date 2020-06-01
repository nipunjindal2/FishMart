import React from "react";
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
    static propTypes = ({
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        fishKey: PropTypes.string,
        updateFish: PropTypes.func
    })
    handleChange = (event) => {
        // Update that fish
        // 1. Take a copy of current fish.
        const updatedFish = {
            ...this.props.fish,
            // name: event.currentTarget.value
            [event.target.name] : event.currentTarget.value // Computed Property names to dynamically update the changed fields.
        };
        this.props.updateFish(this.props.fishKey,updatedFish);
    }
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick = {() => this.props.deleteFish(this.props.fishKey)}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
