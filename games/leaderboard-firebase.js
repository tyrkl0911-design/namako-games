// ナマコゲームズ 共通ランキングAPI(Firebase Firestore + 匿名ログイン)
//
// 各ゲームのHTMLから window.NamakoLB(gameId) を呼び出すと、
// もともとclaude.ai Artifacts専用の db 機能(.doc(path)/.collection(path)...)
// と同じ形のオブジェクトを返す。ゲーム側のランキングロジック(自己ベスト判定・
// 表示処理)は書き換えずに、データの保存先だけをこの共通Firebaseに差し替えるための
// 薄いラッパー。
//
// 呼び出し側より先に以下を読み込んでおくこと(どのゲームでも同じ3行+この1行):
//   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js"></script>
//   <script src="leaderboard-firebase.js"></script>
(function (global) {
  'use strict';

  var firebaseConfig = {
    apiKey: "AIzaSyC7VXuw9WG3y0pLL_08Nfo7AqV3pOo2eJk",
    authDomain: "namakogames.firebaseapp.com",
    projectId: "namakogames",
    storageBucket: "namakogames.firebasestorage.app",
    messagingSenderId: "519760008674",
    appId: "1:519760008674:web:75f3c50fd024566dded5bb"
  };

  var db = null;
  var authReadyPromise = null;

  // firebase.firestore() はここで同期的に呼ぶ(Promiseのexecutorは即時実行されるため)。
  // 匿名ログインの完了(resolve)は非同期だが、db自体は呼び出し元が最初に
  // NamakoLB(gameId) を呼んだ時点で即座に使える状態になる。
  function ensureInit() {
    if (authReadyPromise) return authReadyPromise;
    authReadyPromise = new Promise(function (resolve) {
      try {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        var auth = firebase.auth();
        auth.onAuthStateChanged(function (user) {
          if (user) resolve(user.uid);
        });
        auth.signInAnonymously().catch(function () { resolve(null); });
      } catch (e) {
        resolve(null);
      }
    });
    return authReadyPromise;
  }

  function wrapDocSnap(snap) {
    return { exists: snap.exists, id: snap.id, data: function () { return snap.data(); } };
  }

  function makeDocRef(path) {
    var ref = db.doc(path);
    return {
      get: function () { return ref.get().then(wrapDocSnap); },
      set: function (data) { return ref.set(data); }
    };
  }

  function makeCollectionRef(path) {
    var q = db.collection(path);
    var api = {
      orderBy: function (field, dir) { q = q.orderBy(field, dir || 'asc'); return api; },
      limit: function (n) { q = q.limit(n); return api; },
      get: function () {
        return q.get().then(function (snap) {
          var docs = [];
          snap.forEach(function (d) { docs.push(wrapDocSnap(d)); });
          return { empty: docs.length === 0, docs: docs };
        });
      }
    };
    return api;
  }

  // 各ゲーム側のコードは 'scores' / 'scores/<uid>' という共通のパス名で
  // 呼んでくる(claude.ai db時代のまま)。ここで実際はゲームごとに
  // 名前空間化された leaderboards/<gameId>/entries 以下へ読み替える。
  function remapPath(gameId, path) {
    if (path === 'scores') return 'leaderboards/' + gameId + '/entries';
    if (path.indexOf('scores/') === 0) {
      return 'leaderboards/' + gameId + '/entries/' + path.slice('scores/'.length);
    }
    return path;
  }

  global.NamakoLB = function (gameId) {
    var uidPromise = ensureInit();
    return {
      myId: function () { return uidPromise; },
      doc: function (path) { return makeDocRef(remapPath(gameId, path)); },
      collection: function (path) { return makeCollectionRef(remapPath(gameId, path)); }
    };
  };
})(window);
