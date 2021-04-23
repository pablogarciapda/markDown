import { createStore } from 'vuex';
import { auth, firebase, db } from '../firebase';

export default createStore({
  state: {
    notes: [],
    activeNote: null,
    borrando: false,
    searchTerm: '',
    user: null
  },
  getters: {
    getNoteById: state => noteId =>
      state.notes.find(note => note.id === noteId),
    getNoteTitle: state => noteId => {
      const removeMd = require('remove-markdown');
      const id = noteId ? noteId : state.activeNote;
      const body = state.notes.find(note => note.id === id).body;
      return removeMd(body.substring(0, 20));
    },
    getNotesBySearchTerm: state => {
      let filter = new RegExp(state.searchTerm, 'i');
      return state.notes.filter(note => note.body.match(filter));
    }
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    setActiveNote(state, noteId = null) {
      state.activeNote = noteId;
    },
    updateNote(state, { id, body }) {
      state.notes.find(note => note.id === id).body = body;
    },
    createNote(state, note) {
      state.notes.unshift(note);
    },
    deleteNote(state) {
      const index = state.notes.findIndex(note => note.id === state.activeNote);
      state.notes.splice(index, 1);
      state.activeNote = null;
      state.borrando = false;
    },
    setBorrando(state, borrando) {
      state.borrando = borrando;
    },
    setSearchTerm(state, term) {
      state.searchTerm = term;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    createNote({ commit }) {
      const note = { body: '', id: Date.now() };
      commit('createNote', note);
      commit('setActiveNote', note.id);
    },
    async getNotes({ state, commit }) {
      db.colletion('users')
        .doc(state.user.uid)
        .collection('notes')
        .orderBy('createdAt', 'desc')
        .onSnapShot(doSnapShot);

      function doSnapShot(querySnapShot) {
        let notes = [];
        querySnapShot.forEach(doc => {
          let { body, uid, createdAt } = doc.data();
          notes.push({
            body,
            uid,
            id: doc.id,
            createdAt
          });
        });
        commit('setNotes', notes);
      }
    },
    async userLogin() {
      const provider = firebase.auth.GoogleAuthProvider();

      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async userLogout() {
      try {
        await auth.signOut();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    checkAuth({ commit, dispatch }) {
      auth.onAuthStateChanged(user => {
        commit('setUser', user)
        if (user) {
          dispatch('getNotes');
        }
      });
    }
  },
  modules: {}
});
