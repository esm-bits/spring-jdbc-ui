import { copyValueObject } from '@/helpers'

function emptyResult () {
  return copyValueObject({
    queryId: '',
    columns: [],
    data:    []
  })
}

export default {
  namespaced: true,
  state: {
    results: [
      {
        queryId: '001',
        columns: ['id', 'name'],
        data: [
          { id: 0, name: 'name0' },
          { id: 1, name: 'name1' }
        ]
      },
      {
        queryId: '002',
        columns: ['id', 'message'],
        data: [
          { id: 0, message: 'message0' },
          { id: 1, message: 'message1' }
        ]
      }
    ]
  },
  mutations: {
  },
  getters: {
    getResult: (state) => (queryId) => {
      return state.results.filter(i => i.queryId === queryId)[0] || emptyResult()
    }
  },
  actions: {
  }
}
