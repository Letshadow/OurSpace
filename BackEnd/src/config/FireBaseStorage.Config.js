import dotenv from "dotenv"
dotenv.config('FireBaseStorage.env')

// Your web app's Firebase configuration
const myfirebaseConfig = {
  apiKey:process.env.apiKeyFireBaseStorage,
  authDomain:process.env.authDomainFireBaseStorage,
  projectId:process.env.projectIdFireBaseStorage,
  //storageBucket:process.env.storageBucketFireBaseStorage,
  storageBucket:"ourspace-5516a.appspot.com",
  messagingSenderId:process.env.messagingSenderIdFireBaseStorage,
  appId:process.env.appIdFireBaseStorage
};

export default myfirebaseConfig