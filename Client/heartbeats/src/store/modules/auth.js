const axios = require("axios");

// A state
const state = {
  token: 0,
  level: 0,
  name: "",
};

// Get state
const getters = {
  getToken: (state) => state.token,
  getName: (state) => state.name,
  getLevel: (state) => state.level,
};

// Action calls mutation that changes state
const actions = {
  // Action has param commit to "commit" a mutation
  async login({ commit }, user) {

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(
        "http://localhost:3000/auth/login",
        {
          email: user.email,
          password: user.password,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response);
        commit("setAuth", response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
};

// Changes state
const mutations = {
  setAuth: (state, user) => {
    state.token
  },
};

export default {
  // state: state, // NO ES6
  state,
  getters,
  actions,
  mutations,
};
