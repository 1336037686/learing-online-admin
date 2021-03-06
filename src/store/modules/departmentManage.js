import axios from "axios";
import { Notice } from 'view-design';
import store from "../index";

const state = {
  departmentList: [],
  departmentSelectList: [],
  saveLoding: false
}

const mutations = {
  SET_DEPARTMENT_LIST:(state, data) => {
    state.departmentList = data
  },
  SET_DEPARTMENT_SELECT_LIST:(state, data) => {
    state.departmentSelectList = data
  },
  SET_SAVE_LODING:(state, data) => {
    state.saveLoding = data
  }
}

const actions = {

  /**
   * 查找院系记录转化为Select
   * @param commit
   * @returns {Promise<void>}
   */
  async doQueryDeparmentToSelectList({commit}) {
    await axios.get("/api/v1/department/query").then(response => {
      if(response.data.head.responseCode != "200") this.$Notice.error({title: response.data.head.message , desc: ''});
      let data = []
      response.data.body.data.forEach(function (e) {
        data.push({"label": e.name, "value": e.id})
      })
      commit("SET_DEPARTMENT_SELECT_LIST", data)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 查找所有院系记录
   * @param commit
   * @returns {Promise<void>}
   */
  async doQueryAll({commit}) {
    await axios.get("/api/v1/department/query").then(response => {
      if(response.data.head.responseCode != "200") this.$Notice.error({title: response.data.head.message , desc: ''});
      commit("SET_DEPARTMENT_LIST", response.data.body.data)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 保存院系记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doSave({dispatch, commit}, data) {
    commit("SET_SAVE_LODING", true)
    await axios.post("/api/v1/department/save", {"head": {"token": store.state.loginManage.token}, "body":{"data": data}}).then(response => {
      if(response.data.head.responseCode != "200") {
        Notice.error({title: response.data.head.message , desc: ''});
      } else {
        Notice.success({title: response.data.head.message , desc: ''});
      }
    }).catch(error => {
      console.log(error)
    })
    //重新查找
    await dispatch("doQueryAll")
    commit("SET_SAVE_LODING", false)
  },

  /**
   * 删除院系记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doRemove({dispatch, commit}, data) {
    await axios.delete("/api/v1/department/remove", {data: {"head": {"token": store.state.loginManage.token}, "body":{"data": data}}}).then(response => {
      if(response.data.head.responseCode != "200") {
        Notice.error({title: response.data.head.message , desc: ''});
      } else {
        Notice.success({title: response.data.head.message , desc: ''});
      }
    }).catch(error => {
      console.log(error)
    })
    //重新查找
    await dispatch("doQueryAll")
  },

  /**
   * 修改院系记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doUpdate({dispatch, commit}, data) {
    commit("SET_SAVE_LODING", true)
    await axios.put("/api/v1/department/update", {"head": {"token": store.state.loginManage.token}, "body":{"data": data}}).then(response => {
      if(response.data.head.responseCode != "200") {
        Notice.error({title: response.data.head.message , desc: ''});
      } else {
        Notice.success({title: response.data.head.message , desc: ''});
      }
    }).catch(error => {
      console.log(error)
    })
    //重新查找
    await dispatch("doQueryAll")
    commit("SET_SAVE_LODING", false)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
