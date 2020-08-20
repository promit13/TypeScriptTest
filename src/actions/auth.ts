import {ofType, combineEpics} from 'redux-observable';
import {concatMap, map, catchError, mergeMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ActionTypes} from './types';

type UserDetail = {
  fullName?: string;
  mobile?: number;
  email?: string;
  password?: string;
  gender?: string;
  userId?: string;
};

export const signupUser = (user: UserDetail) => {
  console.log(user);
  return {type: ActionTypes.SIGNUP_USER, payload: user};
};

const signupUserFulfilled = payload => {
  return {type: ActionTypes.SIGNUP_USER_FULFILLED, payload};
};

const signUpUserEpic = action$ => {
  console.log('Inside signup epic');
  return action$.pipe(
    ofType(ActionTypes.SIGNUP_USER),
    mergeMap((action: any) => {
      const {email, password} = action.payload;
      return from(auth().createUserWithEmailAndPassword(email, password)).pipe(
        map(response => {
          console.log(response);
          return signupUserFulfilled(response);
        }),
      );
    }),
    catchError(error => {
      console.log(error);
      return of({
        type: ActionTypes.AUTH_FAILED,
        error: {message: error.message},
      });
    }),
  );
};

export const authEpic = combineEpics(signUpUserEpic);

// export const loginUser = (user: UserDetail) => {
//   return {
//     type: ActionTypes.LOGIN_USER,
//     payload: user,
//   };
// };
// const loginFulfilled = payload => {
//   return {type: ActionTypes.LOGIN_USER_FULFILLED, payload};
// };

// export const fetchUserData = (user: UserDetail) => {
//   return {type: ActionTypes.FETCH_USER_DATA, payload: user};
// };

// const fetchUserDataFulfilled = payload => {
//   return {type: ActionTypes.FETCH_USER_DATA_FULFILLED, payload};
// };

// export const logoutUser = () => {
//   return {type: ActionTypes.LOGOUT_USER};
// };

// const logoutUserFulfilled = () => {
//   return {type: ActionTypes.LOGOUT_USER_FULFILLED};
// };

// const signUpUserEpic = action$ => {
//   console.log('Inside signup epic');
//   return action$.pipe(
//     ofType(ActionTypes.SIGNUP_USER),
//     map((action: any) => {
//       const {email, password} = action.payload;
//       return from(auth().createUserWithEmailAndPassword(email, password)).pipe(
//         concatMap(response => {
//           console.log(response);
//           const {uid} = response.user;
//           const {fullName, mobile, email, gender} = action.payload;
//           const userDetail = {
//             fullName,
//             mobile,
//             email,
//             gender,
//             uid,
//           };
//           return from(
//             firestore()
//               .collection('users')
//               .doc(uid)
//               .set(userDetail),
//           ).pipe(
//             map(
//               response => signupUserFulfilled(response),
//               catchError(err => {
//                 console.log(err);
//                 return of({
//                   type: ActionTypes.AUTH_FAILED,
//                   error: {message: err.message},
//                 });
//               }),
//             ),
//           );
//         }),
//       );
//     }),
//     catchError(error => {
//       console.log(error);
//       return of({
//         type: ActionTypes.AUTH_FAILED,
//         error: {message: error.message},
//       });
//     }),
//   );
// };

// const loginUserEpic = action$ => {
//   console.log('Inisde login epic');
//   return action$.pipe(
//     ofType(ActionTypes.LOGIN_USER),
//     concatMap((action: any) => {
//       const {email, password} = action.payload;
//       return from(auth().signInWithEmailAndPassword(email, password)).pipe(
//         map(response => loginFulfilled(response)),
//       );
//     }),
//     catchError(error => {
//       return of({
//         type: ActionTypes.AUTH_FAILED,
//         error: {message: error.message},
//       });
//     }),
//   );
// };

// const fetchUserDataEpic = action$ => {
//   console.log('Inside fetch epic');
//   return action$.pipe(
//     ofType(ActionTypes.FETCH_USER_DATA),
//     concatMap((action: any) => {
//       return from(
//         firestore()
//           .collection('users')
//           .doc(action.payload)
//           .get(),
//       ).pipe(map(response => fetchUserDataFulfilled(response)));
//     }),
//     catchError(error => {
//       return of({
//         type: ActionTypes.AUTH_FAILED,
//         error: {message: error.message},
//       });
//     }),
//   );
// };

// const logoutUserEpic = action$ => {
//   return action$.pipe(
//     ofType(ActionTypes.LOGOUT_USER),
//     concatMap((action: any) => {
//       return from(auth().signOut()).pipe(map(() => logoutUserFulfilled()));
//     }),
//   );
// };

// export const authEpic = combineEpics(
//   signUpUserEpic,
//   loginUserEpic,
//   logoutUserEpic,
//   fetchUserDataEpic,
// );
