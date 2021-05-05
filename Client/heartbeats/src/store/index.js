import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import patients from "./modules/patients";
import music from "./modules/music";
import speakers from "./modules/speakers";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    patients,
    music,
    speakers,
  },
});
