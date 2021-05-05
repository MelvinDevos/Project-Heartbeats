const axios = require("axios");

// A state
const state = {
  speakers: [],
  selectedSpeaker: "",
};

// Get state
const getters = {
  getSpeakers: (state) => state.speakers,
  getSelectedSpeaker: (state) => state.selectedSpeaker,
};

// Action calls mutation that changes state
const actions = {
  // Action has param commit to "commit" a mutation
  async fetchSpeakers({ commit, rootGetters }) {
    console.log("ik wil speakers fetchen");
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .get(
        `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/music/device/show`,
        { headers: headers }
      )
      .then(function (response) {
        console.log(response);
        commit("setSpeakers", response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },

  setSelectedSpeaker({commit},speaker){
      commit("setSelectedSpeaker", speaker)
  }
};

// Changes state
const mutations = {
  setSpeakers: (state, data) => {
    console.log("ik ga speakers state plaatsen");
    console.log(data);
    state.speakers = data;
  },
  setSelectedSpeaker: (state, data) => {
    state.selectedSpeaker = data;
  },
};

export default {
  // state: state, // NO ES6
  state,
  getters,
  actions,
  mutations,
};
