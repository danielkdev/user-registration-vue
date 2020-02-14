import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "personal-information",
      component: require("@/components/UserRegistration/PersonalInformationForm")
        .default
    },
    {
      path: "/personal-information",
      name: "personal-information",
      component: require("@/components/UserRegistration/PersonalInformationForm")
        .default
    },
    {
      path: "/professional-information",
      name: "professional-information",
      component: require("@/components/UserRegistration/ProfessionalInformationForm")
        .default
    },
    {
      path: "/account-information",
      name: "account-information",
      component: require("@/components/UserRegistration/AccountInformationForm")
        .default
    },
    {
      path: "/contact-information",
      name: "contact-information",
      component: require("@/components/UserRegistration/ContactInformationForm")
        .default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
