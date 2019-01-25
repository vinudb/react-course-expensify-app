import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export {firebase, database as default}
  
//   //child_removed
//   database.ref('expenses').on('child_removed', (snapshot)=>{
//     console.log(snapshot.key , snapshot.val());
//   });

//   //child_changed
//   database.ref('expenses').on('child_changed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
//   });
  
//   //child_added
//   database.ref('expenses').on('child_added', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
//   });  

//   database.ref('expenses')
//     .on('value', (snapshot)=>{
//         const expenses = [];
//         snapshot.forEach((childSnapshot)=>{
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     });

//   database.ref('expenses')
//     .once('value')
//     .then((snapshot)=>{
//         const expenses = [];

//         snapshot.forEach((childSnapshot)=>{
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });


//   database.ref('expenses').push({
//     description:'Rent',
//     note:'No note',
//     amount:10,
//     createdAt:1000
//   });

//   database.ref('expenses').push({
//     description:'Coffee',
//     note:'No note 2',
//     amount:20,
//     createdAt:2000
//   });

//   database.ref('expenses').push({
//     description:'Taxi',
//     note:'No note 3',
//     amount:30,
//     createdAt:3000
//   });

//   const onValueChange = database.ref().on('value', (snapshot)=>{
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   }, (e)=>{
//     console.log('Error fetching the data ', e)
//   });

//   setTimeout(() => {
//         database.ref('job/title').set('Software Engineer');
//   }, 3500);

//   const onValueChange = database.ref().on('value', (snapshot)=>{
//     console.log(snapshot.val());
//   }, (e) => {
//       console.log('Error fetching the data', e);
//   }); 

//   setTimeout(() => {
//      database.ref('age').set(32); 
//   }, 3500);

//   setTimeout(() => {
//     database.ref().off('value', onValueChange); 
//  }, 7000);


//  setTimeout(() => {
//     database.ref('age').set(33); 
//  }, 10500);



//   database.ref()
//     .once('value')
//     .then((snapshot)=>{
//         const val = snapshot.val();
//         console.log(val);
//     })  
//     .catch((e)=>{
//         console.log('Error is ', e);
//     });
  
//   database.ref().set({
//       name: 'Vinay',
//       age: 31,
//       stressLevel: 6,
//       job:{
//           title:"Software Developer",
//           company: "Owner" 
//       },  
//       isSingle: false,
//       location:{
//           city:'Bangalore',
//           country: 'India'
//       }
//   }).then(()=>{
//     console.log('Data is saved');
//   }).catch((e)=>{
//     console.log('Error ', e);
//   });

//   database.ref('age').set(32);
//   database.ref('location/city').set('Bengaluru');

//   database.ref('attributes').set({
//       height: 154,
//       weight: 60
//   }).then(()=>{
//     console.log('Second Data is saved');
//   }).catch((e)=>{
//     console.log('Error ', e);
//   });

// database.ref('isSingle').remove().then(()=>{
//     console.log('Remove success');
// }).catch(()=>{
//     console.log('Remove faile');
// });


// database.ref().update({
//     name: "Vinay Sridhar",
//     age: 32,
//     job: 'Owner',
//     isSingle: null,
//     'location/city':'Mysore'
// });


// database.ref().update({
//     stressLevel: 9,
//     'job/company': "Amazon",
//     'location/city': 'Seattle'
// });