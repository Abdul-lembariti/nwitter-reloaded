import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCLnyKUYFMFbIQg0YY3556w9Y2CP0HTic0',
  authDomain: 'nwitter-reloaded-efda4.firebaseapp.com',
  projectId: 'nwitter-reloaded-efda4',
  storageBucket: 'nwitter-reloaded-efda4.appspot.com',
  messagingSenderId: '246840206377',
  appId: '1:246840206377:web:167161d6dbca0ec72d6838',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
