const axios = require("axios");

// A state
const state = {
  songs: [],
};

// Get state
const getters = {
  getSongs: (state) => state.songs,
};

// Action calls mutation that changes state
const actions = {
  // Action has param commit to "commit" a mutation
  async fetchSongs({ commit, rootGetters }) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .get(`http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/music/song/show`, { headers: headers })
      .then(function (response) {
        console.log(response);
        commit("setSongs", response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
  async deleteSong({ commit, rootGetters }, id) {
    console.log(`Ik ga song met id: ${id} deleten`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    console.log(id);
    await axios
      .delete(`http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/music/song/delete/${id}`, {
        headers: headers,
      })
      .then(function () {
        commit("deleteSong", id);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },

  async addSong({ commit, rootGetters }, song) {
    console.log("add song uitgevoerd!");
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .post(`http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/music/song/add`, song, {
        headers: headers,
      })
      .then(function (response) {
        console.log("iets goed added");
        console.log(response);
        commit("addSong", response.data.song);
      })
      .catch(function (error) {
        console.log("errorke");
        console.log(error.response.data);
      });
  },
};

// Changes state
const mutations = {
  setSongs: (state, data) => {
    state.songs = data;
  },
  deleteSong: (state, id) =>
    (state.songs = state.songs.filter((song) => song.id != id)),

  addSong: (state, song) => {
    state.songs.push(song);
  },
};

export default {
  // state: state, // NO ES6
  state,
  getters,
  actions,
  mutations,
};
