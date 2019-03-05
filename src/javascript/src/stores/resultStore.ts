import {
  createNamespacedHelpers,
  GetterTree,
  MutationTree,
  ActionTree,
  ActionContext,
  Module
} from "vuex";
import { copyValueObject } from "@/helpers";
import axios from "axios";
import { RootState } from "@/stores/rootState";

function emptyResult() {
  return copyValueObject({
    queryId: "",
    columns: [],
    data: []
  });
}

function createResult(queryId: any, response: any) {
  return {
    queryId,
    columns: response.columns
      ? response.columns.map((column: any) => column.label)
      : [],
    data: response.resultSet
  };
}

export interface QueryResult {
  queryId: string;
  columns: string[];
  data: any[];
}

export interface State {
  results: QueryResult[];
}

export interface Getters {
  getResult: (state: any) => (queryId: any) => any;
}

export interface Mutations {
  addQueryResult: (state: any, { queryId, result }: any) => void;
}

export interface Actions {
  executeQuery: ({ commit }: any, { query }: any) => Promise<void>;
}

export const state: State = {
  results: [
    {
      queryId: "001",
      columns: ["id", "name"],
      data: [{ id: 0, name: "name0" }, { id: 1, name: "name1" }]
    },
    {
      queryId: "002",
      columns: ["id", "message"],
      data: [{ id: 0, message: "message0" }, { id: 1, message: "message1" }]
    }
  ]
};

export const mutations = <MutationTree<State>>{
  addQueryResult(state: any, { queryId, result }: any) {
    state.results.unshift(createResult(queryId, result));
  }
};

export const getters = <GetterTree<State, any>>{
  getResult: (state: any) => (queryId: any) => {
    return (
      state.results.find((i: any) => i.queryId === queryId) || emptyResult()
    );
  }
};

export const actions = <ActionTree<State, any>>{
  async executeQuery({ commit }: any, { query }: any) {
    const response = await axios.post("/api/query", { sql: query.rawQuery });
    const result = response.data;
    commit("addQueryResult", { queryId: query.id, result });
  }
};

export const resultStore: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
