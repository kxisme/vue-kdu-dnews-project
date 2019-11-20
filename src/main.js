import "@/assets/css/bulma.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,

  computed: {
    user_signed_in_status() {
      return this.$store.getters.signedInStatus;
    }
  },

  created() {
    this.setAuth();
  },

  methods: {
    setAuth: function(){
      if(localStorage.getItem('signed_in_status') === 'true'){
        this.$store.dispatch("sign_in_user");
      }else{
        this.$store.dispatch("sign_out_user");
      }
    }
  },

  render: h => h(App)
}).$mount("#app");
