const axios = require("axios");

// A state
const state = {
  patients: [],
};

// Get state
const getters = {
  getPatients: (state) => state.patients,
};

// Action calls mutation that changes state
const actions = {
  // Action has param commit to "commit" a mutation
  async fetchPatients({ commit, rootGetters }) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .get("http://localhost:3000/patient/show", { headers: headers })
      .then(function (response) {
        console.log(response);
        commit("setPatients", response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
  async deletePatient({ commit, rootGetters }, id) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    console.log(id)
    await axios
      .delete(`http://localhost:3000/patient/delete/${id}`, { headers: headers })
      .then(function (response) {
        console.log("gelukt!")
        console.log(response);
        commit("test")
      })
      .catch(function (error) {
        console.log("error")
        console.log(error.response.data);
      });
  },
};

// Changes state
const mutations = {
  setPatients: (state, data) => {
    state.patients = data;
  },
};

export default {
  // state: state, // NO ES6
  state,
  getters,
  actions,
  mutations,
};
