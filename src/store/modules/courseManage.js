//人脸检测API
import axios from "axios";
import { Notice } from 'view-design';
import moment from 'moment'

const state = {
  teacherList: [],
  categoryList: [],
  courseData: {
    pageInfo: {
      list: [],
      pages: 0,
      total: 0
    }
  },
  saveLoding: false,
  size: 20,
}

const mutations = {
  SET_COURSE_DATA :(state, data) => {
    state.courseData = data
  },
  SET_SAVE_LODING:(state, data) => {
    state.saveLoding = data
  },
  SET_TEACHER_LIST:(state, data) => {
    state.teacherList = data
  },
  SET_CATEGORY_LIST:(state, data) => {
    state.categoryList = data
  },
}

const actions = {

  /**
   * 查找院系记录
   * @param commit
   * @returns {Promise<void>}
   */
  async doQueryCategoryList({commit}) {
    await axios.get("/api/v1/category/query").then(response => {
      if(response.data.head.responseCode !== "200") this.$Notice.error({title: response.data.head.message , desc: ''});
      commit("SET_CATEGORY_LIST", response.data.body.data)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 查找教师记录
   * @param commit
   * @returns {Promise<void>}
   */
  async doQueryTeacherList({commit}) {
    await axios.get("/api/v1/teacher/query").then(response => {
      if(response.data.head.responseCode !== "200") this.$Notice.error({title: response.data.head.message , desc: ''});
      commit("SET_TEACHER_LIST", response.data.body.data)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 分页查找课程信息记录
   * @param commit
   * @returns {Promise<void>}
   */
  async doQueryAll({dispatch, state, commit}, data) {
    await dispatch("doQueryTeacherList")
    await dispatch("doQueryCategoryList")
    await axios.post("/api/v1/course/query", {"body": {"data": {"currentPage": data, "size": state.size}}}).then(response => {
      if(response.data.head.responseCode != "200") {
        this.$Notice.error({title: response.data.head.message , desc: ''});
        return;
      }
      //数据转换
      let list = response.data.body.data.pageInfo.list
      for(let i = 0; i < list.length; i++) {
        list[i].time = moment(list[i].time).format('YYYY-MM-DD')
        state.categoryList.forEach(function (e) {
          if(e.id == list[i].type) {
            list[i]["categoryName"] = e.categoryName
          }
        })
        state.teacherList.forEach(function (e) {
          if(e.id == list[i].teacher) {
            list[i]["teacherName"] = e.name
          }
        })
      }
      commit("SET_COURSE_DATA", response.data.body.data)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 修改课程记录
   * @param commit
   * @param data
   * @returns {Promise<void>}
   */
  async doUpdate({dispatch, commit}, data) {
    commit("SET_SAVE_LODING", true)
    await axios.put("/api/v1/course/update", {"body":{"data": data.data}}).then(response => {
      if(response.data.head.responseCode != "200") {
        Notice.error({title: response.data.head.message , desc: ''});
      } else {
        Notice.success({title: response.data.head.message , desc: ''});
      }
    }).catch(error => {
      console.log(error)
    })
    //重新查找
    await dispatch("doQueryAll", data.currentPage)
    commit("SET_SAVE_LODING", false)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
