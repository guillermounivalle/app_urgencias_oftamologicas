//import Firestore from '@google-cloud/firestore';
//import firebase from 'firebase';

import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';




const fire = firebase.initializeApp({
	apiKey: "AIzaSyCcosYVhMJ5LriT-F_s3YgWeB_qM9_P6u0",
	authDomain: "app-urgencias-oftamologicas.firebaseapp.com",
	databaseURL: "https://app-urgencias-oftamologicas-default-rtdb.firebaseio.com",
	projectId: "app-urgencias-oftamologicas",
	storageBucket: "app-urgencias-oftamologicas.appspot.com",
	messagingSenderId: "678900420337",
	appId: "1:678900420337:web:d8b91089538e1a86f0e350",
	measurementId: "G-BPFPTQEV87"
});

// Initialize Firebase
/**
 * if(!firebase.apps.length){
	firebase.initializeApp(firebaseConfig)
};
 */

const db = fire.firestore();
export const auth = fire.auth();

export default {
	fire,
	db
}  