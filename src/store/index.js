import { createStore } from "vuex";
import CourseService from '../Service/CourseService';

const STORE =  createStore({
  state: {
    courses: [],
    teachers:[]
  },
  mutations: {
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    PUSH_COURSE(state, course){
      state.courses.push(course);
    },
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    },
    PUSH_TEACHER(state, teacher){      
      state.teachers.push(teacher);
    },
  },
  actions: {
    async fetchAllCourses(context) {
        let response = await CourseService.getAllCourses()
        await context.commit('SET_COURSES',response.data)
    },
    async fetchAllTeachers(context) {
      let response = await CourseService.getAllTeachers()
      await context.commit('SET_TEACHERS',response.data)
    },
    saveCourse(context, course) {
      let ret = CourseService.saveCourse(course);
      context.commit("PUSH_COURSE", ret);
    },
    deleteCourse(context, course) {
      let ret = CourseService.deleteCourse(course.id);
      console.log(ret)     
    }
  },
  getters: {
    getCourse: (state) =>(id) =>{
      let ret = id
      state.courses.forEach(c => {if (c.id == id){ret = c}})
      return ret;
    },
    getCourses: (state) =>{
      return state.courses;
    },
    getTeachers: (state) =>{
      return state.teachers;
    }
  },
  modules: {},
});

export default STORE;