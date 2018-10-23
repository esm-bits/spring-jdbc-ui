export default {
  namespaced: true,
  state: {
    currentQuery: {
        id: '',
        rawQuery: '',
        parameters: [],
        description: '',
        lastUpdatedAt: ''
    },
    queries: [
      {
        id: '001',
        rawQuery: 'SELECT * FROM test_table',
        parameters: [
          {
            name: 'tableName'
          }
        ],
        description: '簡単なSELECTクエリ',
        lastUpdatedAt: '2018/08/01 15:00:00'
      },
      {
        id: '002',
        rawQuery: 'INSERT INTO test_table ...',
        parameters: [],
        description: '動かないINSERTクエリ',
        lastUpdatedAt: '2018/01/01 15:00:00'
      }
    ]
  },
  mutations: {
    changeCurrentQuery (state, { id }) {
      const nextQuery = state.queries.filter(e => e.id === id)[0]
      if (!nextQuery) return

      state.currentQuery = nextQuery
    },
    updateCurrentQuery (state, { rawQuery }) {
      state.currentQuery.rawQuery = rawQuery
    }
  },
  getters: {
    getQueries (state) {
      return state.queries
    },
    getCurrentQuery (state) {
      return state.currentQuery
    }
  },
  actions: {
    changeCurrentQuery ({ commit }, { id }) {
      commit('changeCurrentQuery', { id })
    },
    updateCurrentQuery ({ commit }, { rawQuery }) {
      commit('updateCurrentQuery', { rawQuery })
    }
  }
}
