import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Returns a promise holding an array of our score objects
//Game parameter is either memory, snake or minesweeper (collection id)
export function fetchLeaderboard(game) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  return auth
    .signInAnonymously()
    .then(() => db.collection(game).orderBy("time", "asc").get()) //ascending. callback
    .then((querySnapshot) => {
      let leaderboard = [];
      querySnapshot.forEach((doc) => {
        leaderboard.push(doc.data());
      });
      return leaderboard;
    })
    .catch(function (error) {
      console.log("Error getting leaderboard: ", error);
    });
}
//Returns a promise for saving the score
export function saveScore(game, score) {
    const auth = firebase.auth();
    const db = firebase.firestore();
    return auth
      .signInAnonymously()
      .then(() => db.collection(game).add(score))
      .catch(function (error) {
        console.log("Error saving score: ", error);
      });
  }