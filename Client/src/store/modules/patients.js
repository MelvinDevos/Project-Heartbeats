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
      .get(
        `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/patient/show`,
        { headers: headers }
      )
      .then(function (response) {
        console.log(response);
        commit("setPatients", response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
  async updatePatient({ commit, rootGetters }, patient) {
    patient.box_id = rootGetters.getSelectedSpeaker;
    console.log("voor de update<<<<<<");
    console.log(patient);
    const id = patient.id;
    delete patient.id;
    console.log("update uitgevoerd!");
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };

    // console.log("patient ervoor")
    // console.log(patient)
    // console.log("patient erna")
    // patient = {...patient, box_id: rootGetters.getSelectedSpeaker}
    // console.log(patient)
    await axios
      .put(
        `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/patient/update/${id}`,
        patient,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        commit("updatePatient", response.data.patient);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },

  async addPatient({ commit, rootGetters }, patient) {
    console.log("add uitgevoerd!");
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    await axios
      .post(
        `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/patient/create`,
        patient,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log("iets goed added");
        console.log(response);
        commit("addPatient", response.data.patient);
      })
      .catch(function (error) {
        console.log("errorke");
        console.log(error.response.data);
      });
  },
  async deletePatient({ commit, rootGetters }, id) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootGetters.getToken,
    };
    console.log(id);
    await axios
      .delete(
        `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/patient/delete/${id}`,
        {
          headers: headers,
        }
      )
      .then(function () {
        commit("deletePatient", id);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  },
  sortAction({ commit }, prop) {
    commit("sortPatients", prop);
  },
};

// Changes state
const mutations = {
  setPatients: (state, data) => {
    state.patients = data;
  },

  addPatient: (state, patient) => {
    state.patients.push(patient);
  },
  deletePatient: (state, id) =>
    (state.patients = state.patients.filter((patient) => patient.id != id)),
  updatePatient: (state, data) => {
    state.patients = state.patients.map((patient) => {
      if (patient.id == data.id) return data;
      return patient;
    });
  },
  sortPatients(state, prop) {
    state.patients.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
  },
};

export default {
  // state: state, // NO ES6
  state,
  getters,
  actions,
  mutations,
};
