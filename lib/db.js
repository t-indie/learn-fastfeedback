import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  // console.log('createUser', uid, data);
  // console.log(uid);
  // console.log(data);
  return firestore
    .collection('users')
    .doc(uid)
    .set({uid, ...data}, {merge: true});
}

export function createSite(data) {
  return firestore.collection('sites').add(data);
}

export function createFeedback(data) {
  console.log('createFeedback', data);
  return firestore.collection('feedback').add(data);
}
