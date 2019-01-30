import CQL from 'cql.js'
import _ from 'lodash'

// cql instance for API call
const BP_ENDPOINT = 'ws://bp00.cn.gridb.io:15150'
const cql = new CQL(BP_ENDPOINT)
cql.connect()

// initial state
const state = {
  runningStatus: {},
  pagination: {},
  blocks: [],
}

// getters
const getters = {
  latestHeight(state) {
    return state.pagination.total
  },
}

// actions
const actions = {
  async getBlocks({ commit }, { page, size }) {
    const result = await cql.bp.getBlockList(page, size)
    commit('setBlocks', result)
  },
}

// mutations
const mutations = {
  setBlocks(state, { blocks, pagination }) {
    const _blocks = state.blocks.concat(blocks)
    state.blocks = _.uniqBy(_blocks, b => b.hash)
    state.pagination = pagination
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
