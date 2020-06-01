import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({ user })
      }
    })
  }
  authHandler = async authData => {
    // Lookup up the current store in firebase.
    const store = await base.fetch(this.props.storeId, { context: this });
    // Claim it if there is no owner
    if (!store.owner) {
      // Claim the store
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid // Payload from provider
      });
    }
    // Set state of Inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    // const authProvider = new firebase.auth.FacebookAuthProvider();
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logged out");
    await firebase.auth().signOut;
    this.setState({ uid: null })
  }

  render() {
    const logout = <button onClick={this.logout}> LOGOUT </button>

    // Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // Check if they are not the owners of store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not authorised owner to this store</p>
          {logout}
        </div>
      );
    }
    // Render if they are owners
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(fishKey => (
          <EditFishForm
            key={fishKey}
            fishKey={fishKey}
            fish={this.props.fishes[fishKey]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}

        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
