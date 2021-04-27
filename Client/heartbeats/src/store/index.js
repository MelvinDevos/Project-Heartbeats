import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import patients from "./modules/patients";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    patients,
  },
});
