import { DateTime } from "luxon";

function createTemplateQuery() {
  const now = DateTime.local();
  return {
    id: now.toMillis(),
    rawQuery: "",
    parameters: [],
    description: "",
    lastUpdatedAt: now.toFormat("DD TT")
  };
}

function createDefaultDescription(state: any) {
  return `Query-${state.queries.length + 1}`;
}

export default {
  namespaced: true,
  state: {
    currentQuery: {
      id: "",
      rawQuery: "",
      parameters: [],
      description: "",
      lastUpdatedAt: ""
    },
    queries: [
      {
        id: "001",
        rawQuery: "SELECT * FROM test_table",
        parameters: [
          {
            name: "tableName"
          }
        ],
        description: "簡単なSELECTクエリ",
        lastUpdatedAt: "2018/08/01 15:00:00"
      },
      {
        id: "002",
        rawQuery: "INSERT INTO test_table ...",
        parameters: [],
        description: "動かないINSERTクエリ",
        lastUpdatedAt: "2018/01/01 15:00:00"
      }
    ]
  },
  mutations: {
    createNewQuery(state: any, { showNewQuery }: any) {
      const newQuery = createTemplateQuery();
      newQuery.description = createDefaultDescription(state);
      state.queries.push(newQuery);
      if (showNewQuery) {
        state.currentQuery = newQuery;
      }
    },
    changeCurrentQuery(state: any, { id }: any) {
      const nextQuery = state.queries.filter((e: any) => e.id === id)[0];
      if (!nextQuery) return;

      state.currentQuery = nextQuery;
    },
    updateCurrentQuery(state: any, { rawQuery }: any) {
      state.currentQuery.rawQuery = rawQuery;
    },
    updateCurrentQueryDescription(state: any, { description }: any) {
      state.currentQuery.description = description;
    }
  },
  getters: {
    getQueries(state: any) {
      return state.queries;
    },
    getCurrentQuery(state: any) {
      return state.currentQuery;
    }
  },
  actions: {
    createNewQuery({ commit }: any, options = { showNewQuery: true }) {
      console.log(options);
      const { showNewQuery } = options;
      commit("createNewQuery", { showNewQuery });
    },
    changeCurrentQuery({ commit }: any, { id }: any) {
      commit("changeCurrentQuery", { id });
    },
    updateCurrentQuery({ commit }: any, { rawQuery }: any) {
      commit("updateCurrentQuery", { rawQuery });
    },
    updateCurrentQueryDescription({ commit }: any, { description }: any) {
      commit("updateCurrentQueryDescription", { description });
    }
  }
};
