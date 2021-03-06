//人脸检测API
import axios from "axios";
import { Notice } from 'view-design';
import store from "../index";

const state = {
  categoryList: [],
  saveLoding: false
}

const mutations = {
  // SET_DATA:(state, data) => {
  //   state.user = data
  // }
  SET_CATEGORY_LIST:(state, data) => {
    state.categoryList = data
  },
  SET_SAVE_LODING:(state, data) => {
    state.saveLoding = data
  }
}

const actions = {

  /**
   * 查找所有课程类别记录
   * @param commit
   * @returns {Promise<void>}
   */
  async doQueryAll({commit}) {
    await axios.get("/api/v1/category/query").then(response => {
      if(response.data.head.responseCode != "200") this.$Notice.error({title: response.data.head.message , desc: ''});
      commit("SET_CATEGORY_LIST", response.data.body.data)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 保存课堂类别记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doSave({dispatch, commit}, data) {
    commit("SET_SAVE_LODING", true)
    await axios.post("/api/v1/category/save", {"head": {"token": store.state.loginManage.token}, "body":{"data": data}}).then(response => {
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
   * 删除课堂类别记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doRemove({dispatch, commit}, data) {
    await axios.delete("/api/v1/category/remove", {data: {"head": {"token": store.state.loginManage.token}, "body":{"data": data}}}).then(response => {
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
   * 修改课堂类别记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doUpdate({dispatch, commit}, data) {
    commit("SET_SAVE_LODING", true)
    await axios.put("/api/v1/category/update", {"head": {"token": store.state.loginManage.token}, "body":{"data": data}}).then(response => {
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
