import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialog_loader: false,
    snackbar: false,
    text_snackbar: "",
  },
  mutations: {
    SET_Loader(state, data) {
      // console.log(data)
      state.dialog_loader = data;
    },
    SET_Snackbar(state, data) {
      // console.log("snackbar", data)
      if (data === true) {
        setTimeout(() => {
          state.snackbar = data;
        }, 200);
        state.snackbar = false;
      }
      // this.$store.state.snackbar = data
      // state.text_snackbar = data
    },
  },
  actions: {},
  modules: {},
});
