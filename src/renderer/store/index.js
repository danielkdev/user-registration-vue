import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initialState = {
  user: {
    personalInfo: null,
    professionalInfo: null,
    accountInfo: null,
    contactInfo: null
  }
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    savePersonalInfo({ user }, personalInfo) {
      user.personalInfo = personalInfo;
    },
    saveProfessionalInfo({ user }, professionalInfo) {
      user.professionalInfo = professionalInfo;
    },
    saveAccountInfo({ user }, accountInfo) {
      user.accountInfo = accountInfo;
    },
    saveContactInfo({ user }, contactInfo) {
      user.contactInfo = contactInfo;
    },
    clearUser({ user }) {
      user.personalInfo = null;
      user.professionalInfo = null;
      user.accountInfo = null;
      user.contactInfo = null;
    }
  },
  getters: {
    getUser: state => state.user,
    getUserPersonalInfo: state => state.user.personalInfo,
    getUserProfessionalInfo: state => state.user.professionalInfo,
    getUserAccountInfo: state => state.user.accountInfo,
    getUserContactInfo: state => state.user.contactInfo
  }
});
