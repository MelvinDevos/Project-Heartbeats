const axios = require("axios");

// A state
const state = {
  songs: [],
};

// Get state
const getters = {
  getList: (state) => state.songs,
};

// Action calls mutation that changes state
const actions = {

  async updatePlaylist({ commit, rootGetters }, data) {
    console.log("update song uitgevoerd!");
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .post(`http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/playist/update/${data.id}`, data.playlist, {
        headers: headers,
      })
      .then(function (response) {
        console.log("iets goed added");
        console.log(response);
        commit("updatePlaylist", response.data.song);
      })
      .catch(function (error) {
        console.log("errorke");
        console.log(error.response.data);
      });
  },
};

// Changes state
const mutations = {
  updatePlaylist: (state, song) => {
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
