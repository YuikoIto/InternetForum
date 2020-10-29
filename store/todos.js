//firebaseの初期化の部分のインストール
import firebase from '~/plugins/firebase'
//firestoreのアクション部分のパッケージ？をインストールする
import { firestoreAction } from 'vuexfire'

//firebaseのDBを定義する

const db = firebase.firestore()
const todosRef = db.collection('todo')

//ここでstateを定義する。今回使うdbであるtodoを配列で格納する
export const state = () => ({
  todos: []
})

export const actions = {
  //initは初期化
  //ここでどのデータをバインド（=関連付けするか）を書く
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  add: firestoreAction((content, name) => {
    //ここでnameが空白でないことを確認している。
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        //ここでサーバーから時刻を取得する。ローカルからだとユーザーが時刻を変更できてしまうので、サーバーから取得する
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  remove: firestoreAction((content, id) => {
    todosRef.doc(id).delete()
  }),
  //checkboxの操作時の処理
  toggle: firestoreAction((content, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}