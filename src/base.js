import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyBkW-11dy4BZaxkEYZM1K8FAK1_xyOpyOU",
        authDomain: "catch-of-the-day-by-wes-bos.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-by-wes-bos.firebaseio.com"
      }
);

const base = Rebase.createClass(firebase.database());


export {firebaseApp};

export default base;