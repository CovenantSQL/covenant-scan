import CQL from 'cql.js'
import _ from 'lodash'

// cql instance for API call
const BP_ENDPOINT = 'ws://bp00.cn.gridb.io:15150'
const cql = new CQL(BP_ENDPOINT)

// initial state
const state = {
  isConnected: false,
  running_status: {},
  blocks: [], // for landing page
  block_pagination: {},
  txs: [],
  tx_pagination: {},
}

// getters
const getters = {
  latestHeight(state) {
    return _.get(state.blocks, [0, 'height'])
  },
  latestTxCount(state) {
    return state.tx_pagination.total
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
  connectBP({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        await cql.connect()
        commit('setIsConnected', true)
        resolve(true)
      } catch (e) {
        commit('setIsConnected', false)
        reject(e)
      }
    })
  },
  async getBlockByHash({ commit }, hash) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await cql.bp.getBlockByHash(hash)
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  },
  async getBlocks({ commit }, { page, size }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await cql.bp.getBlockList(page, size)
        commit('setBlocks', result)
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  },
  async getTxs({ commit }, { page, size }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await cql.bp.getTransactionList(page, size)
        commit('setTxs', result)
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  },
  async getTransactionByHash({ commit }, hash) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await cql.bp.getTransactionByHash(hash)
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  },
}

// mutations
const mutations = {
  setBlocks(state, { blocks, pagination }) {
    const _blocks = state.blocks.concat(blocks)
    state.blocks = _.reverse(_.sortBy(_.uniqBy(_blocks, b => b.hash), b => b.timestamp))
    state.block_pagination = pagination
  },
  setTxs(state, { transactions, pagination }) {
    const _txs = state.txs.concat(transactions)
    state.txs = _.reverse(_.sortBy(_.uniqBy(_txs, b => b.hash), b => b.timestamp))
    state.tx_pagination = pagination
  },
  setIsConnected(state, connected) {
    state.isConnected = connected
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
