const axios = require("axios");
const jwt = require("jsonwebtoken");
import router from '../../router/index'


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
        console.log(process.env.VUE_APP_JWT_TOKEN_SECRET)
        commit("setAuth", response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
  logout({ commit }){
    commit("removeAuth")
  },
};

// Changes state
const mutations = {
  setAuth: (state, data) => {
    state.token = "testinggg";
    jwt.verify(
      data.token,
      process.env.VUE_APP_JWT_TOKEN_SECRET,
      function (err, decoded) {
        if (decoded != undefined) {
          state.level = decoded.level;
          state.name = decoded.name;
          state.token = data.token;
          router.push("/Dashboard")
        }
      }
    );
  },
  removeAuth: (state) =>{
    state.token ="";
    state.name = "";
    state.level = 0;
    router.push("/")
  }
};

export default {
  // state: state, // NO ES6
  state,
  getters,
  actions,
  mutations,
};
