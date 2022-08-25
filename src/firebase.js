// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, get, query } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

function startFireBase() {
	const firebaseConfig = {
		apiKey: 'AIzaSyA6t37tj6xHooDWVf41q5m3ij_cJ_bprxU',
		authDomain: 'fantasy-dd182.firebaseapp.com',
		projectId: 'fantasy-dd182',
		storageBucket: 'fantasy-dd182.appspot.com',
		databaseURl: 'https://fantasy-dd182-default-rtdb.firebaseio.com/',
		messagingSenderId: '1027481107170',
		appId: '1:1027481107170:web:db6cdcf97b7bc828f8bcbb',
	}

	// Initialize Firebase
	const app = initializeApp(firebaseConfig)
	return getDatabase(app)
}

export default startFireBase
