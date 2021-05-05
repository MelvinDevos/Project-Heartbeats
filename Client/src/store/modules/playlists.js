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
  async fetchList({ commit, rootGetters },id) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .get(`http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/Playlist/show/${id}`, { headers: headers })
      .then(function (response) {
        console.log(response);
        let test=[{ "id": 2, "name": "Seven Nation Army, Evokings Remix", "yt_link": "KyZlegM0eKY", "duration": "5:03" }, { "id": 4, "name": "Crazy Frog", "yt_link": "k85mRPqvMbE", "duration": "5:03" }, { "id": 6, "name": "Battle of the Fates SW", "yt_link": "k85mRPqvMbE", "duration": "5:03" }]
        commit("fetchList", test);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
  async updatePlaylist({ commit, rootGetters }, data) {
    console.log("select song uitgevoerd!");
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .post(`${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/playist/update/${data.id}`, data.playlist, {
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
