import CQL from 'cql.js'
import _ from 'lodash'

// cql instance for API call
const BP_ENDPOINT = 'ws://bp00.cn.gridb.io:15150'
const cql = new CQL(BP_ENDPOINT)
cql.connect()

// initial state
const state = {
  running_status: {},
  blocks: [], // for landing page
  block_pagination: {},
  txs: [],
  tx_pagination: {},
}

// getters
const getters = {
  latestHeight(state) {
    return state.block_pagination.total
  },
  landingBlocks(state) {
    return state.blocks.slice(0, 10)
  },
  landingTxs(state) {
    return state.txs.slice(0, 10)
  },
}

// actions
const actions = {
  async getBlocks({ commit }, { page, size }) {
    const result = await cql.bp.getBlockList(page, size)
    commit('setBlocks', result)
  },
  async getTxs({ commit }, { page, size }) {
    const result = await cql.bp.getTransactionList(page, size)
    commit('setTxs', result)
  },
}

// mutations
const mutations = {
  setBlocks(state, { blocks, pagination }) {
    const _blocks = state.blocks.concat(blocks)
    state.blocks = _.uniqBy(_blocks, b => b.hash)
    state.block_pagination = pagination
  },
  setTxs(state, { transactions, pagination }) {
    const _txs = state.txs.concat(transactions)
    state.txs = _.uniqBy(_txs, t => t.hash)
    state.tx_pagination = pagination
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
