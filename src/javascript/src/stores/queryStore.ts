import Vuex, { createNamespacedHelpers } from "vuex";
import {
  DefineActions,
  DefineGetters,
  DefineMutations
} from "vuex-type-helper";
import { DateTime } from "luxon";

function createTemplateQuery(): Query {
  const now = DateTime.local();
  return {
    id: "" + now.toMillis(),
    rawQuery: "",
    parameters: [],
    description: "",
    lastUpdatedAt: now.toFormat("DD TT")
  };
}

function createDefaultDescription(state: any) {
  return `Query-${state.queries.length + 1}`;
}

export type Query = {
  id: string;
  rawQuery: string;
  parameters: any[];
  description: string;
  lastUpdatedAt: string;
};

export interface State {
  currentQuery: Query;
  queries: Query[];
}

export interface Getters {
  getqueries: Query[];
  getcurrentquery: Query;
}

export interface Mutations {
  createNewQuery: {};
  changeCurrentQuery: {};
  updateCurrentQuery: {};
  updateCurrentQueryDescription: {};
}

export interface Actions {
  createNewQuery: {};
  changeCurrentQuery: {};
  updateCurrentQuery: {};
  updateCurrentQueryDescription: {};
}

export const state: State = {
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
};

export const getters: DefineGetters<Getters, State> = {
  getqueries(state: any) {
    return state.queries;
  },
  getcurrentquery(state: any) {
    return state.currentquery;
  }
};

export const mutations: DefineMutations<Mutations, State> = {
  createNewQuery(state, { showNewQuery }: any) {
    const newQuery = createTemplateQuery();
    newQuery.description = createDefaultDescription(state);
    state.queries.push(newQuery);
    if (showNewQuery) {
      state.currentQuery = newQuery;
    }
  },
  changeCurrentQuery(state, { id }: any) {
    const nextQuery = state.queries.filter((e: any) => e.id === id)[0];
    if (!nextQuery) return;

    state.currentQuery = nextQuery;
  },
  updateCurrentQuery(state, { rawQuery }: any) {
    state.currentQuery.rawQuery = rawQuery;
  },
  updateCurrentQueryDescription(state, { description }: any) {
    state.currentQuery.description = description;
  }
};

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  createNewQuery(
    { commit }: any,
    options: { showNewQuery?: boolean } = { showNewQuery: true }
  ) {
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
};

export const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers<State, Getters, Mutations, Actions>("queryStore");

export const queryStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
