import Vue from "vue";
import Vuex from "vuex";

import { RootState } from "@/stores/rootState";
import { queryStore } from "@/stores/queryStore";
import { resultStore } from "@/stores/resultStore";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    queryStore,
    resultStore
  }
});
