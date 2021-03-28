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
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
}

export function createFeedback(data) {
  console.log('createFeedback', data);
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}
