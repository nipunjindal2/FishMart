import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';
import { render } from 'react-dom';

class StorePicker extends React.Component{
    // constructor(){
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    static propTypes = {
        history: PropTypes.object
        }
    myInput = React.createRef();            //Created an empty ref to use it against some ref object in form below.
    
    goToStore = (event) => {
        event.preventDefault();
        // get text from the input fields.
        const storeName = (this.myInput.current.value);
        // Change the page to /store/whatever-in-input
        this.props.history.push(`/store/${storeName}`);
    }
    render(){
        return (
            <React.Fragment>
                {/* this is a comment */}
                <form action="" className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a Store Name</h2>
                    <input 
                        type = "text" 
                        ref={this.myInput}
                        required 
                        placeholder = "Store Name" 
                        defaultValue = {getFunName()} 
                    />
                    <button type="submit">Visit Store </button>
                </form>
                </React.Fragment>
        );
       
    }
}

export default StorePicker;