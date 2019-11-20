import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signed_in_status: false
  },
  mutations: {
    setSignInStatus(state, status) {
      state.signed_in_status = status;
    }
  },
  actions: {
    sign_in_user({ commit }) {
      commit("setSignInStatus", true);
    },
    sign_out_user({ commit }) {
      commit("setSignInStatus", false);
    }
  },
  getters: {
    signedInStatus(state) {
      return state.signed_in_status;
    }
  },
  modules: {}
});
