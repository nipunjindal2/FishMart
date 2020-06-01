import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate from local storage if available
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = fish => {
    // Take a copy of state before mutating
    const fishState = { ...this.state.fishes };
    // Add our new fish to the fishes variable
    fishState[`fish${Date.now()}`] = fish;
    // update the state with new fishState
    this.setState({
      fishes: fishState
    });
  };

  updateFish = (fishKey, updatedFish) => {
    // 1. Take copy of current state.
    const fishesState = { ...this.state.fishes };
    // 2. Update
    fishesState[fishKey] = updatedFish;
    // 3. Set that to state
    this.setState({
      fishes: fishesState
    });
  };

  deleteFish = fishKey => {
    // Take copy of the state.
    const fishState = { ...this.state.fishes };
    // Update the state.
    fishState[fishKey] = null;
    // SetState
    this.setState({
      fishes: fishState
    });
  };
  removeFromOrder = fishKey => {
    // 1) Take a copy of the state.
    const orderState = { ...this.state.order };
    // 2) Remove from order
    delete orderState[fishKey]; // As we need not mirror state in firebase, we can use this.
    // 3) Call setState
    this.setState({
      order: orderState
    });
  };
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = fishObj => {
    // 1) Take a copy of the state.
    const orderState = { ...this.state.order };
    // 2) Add to order or update if item already exists.
    orderState[fishObj] = orderState[fishObj] + 1 || 1; // If that fish exists in state, add 1 to qty or add first of its kind to the order.

    // 3) Call setState to update our obj
    this.setState({
      order: orderState
    });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea food Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(fishObj => (
              <Fish
                key={fishObj} // This key is used for map func but can't be accessed in props for anything else later.
                index={fishObj} // Defined specifically to be used as index key in order
                details={this.state.fishes[fishObj]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {/* <Order {...this.state} />                                  this will spread all properties of the state to the order, so until we dont want everything in there to be passed, dont spread whole state and rather go for individual state properties as in above line */}
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
