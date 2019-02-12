import { copyValueObject } from "@/helpers";
import axios from "axios";

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

export default {
  namespaced: true,
  state: {
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
  },
  mutations: {
    addQueryResult(state: any, { queryId, result }: any) {
      state.results.unshift(createResult(queryId, result));
    }
  },
  getters: {
    getResult: (state: any) => (queryId: any) => {
      return (
        state.results.find((i: any) => i.queryId === queryId) || emptyResult()
      );
    }
  },
  actions: {
    async executeQuery({ commit }: any, { query }: any) {
      const response = await axios.post("/api/query", { sql: query.rawQuery });
      const result = response.data;
      commit("addQueryResult", { queryId: query.id, result });
    }
  }
};
