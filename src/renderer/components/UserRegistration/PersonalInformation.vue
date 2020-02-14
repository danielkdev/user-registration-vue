<template>
  <div v-if="userPersonalInfo" class="personal-info-table">
    <md-table class="center-box" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Personal Informations</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-cell>Name</md-table-cell>
        <md-table-cell
          >{{ userPersonalInfo.firstName }}
          {{ userPersonalInfo.lastName }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell>Age</md-table-cell>
        <md-table-cell>{{ userPersonalInfo.age }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Gender</md-table-cell>
        <md-table-cell>{{ userPersonalInfo.gender }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Age</md-table-cell>
        <md-table-cell>{{ userPersonalInfo.email }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PersonalInformation",
  computed: {
    userPersonalInfo() {
      return this.$store.getters.getUserPersonalInfo;
    },
    ...mapGetters(["getUserPersonalInfo"])
  }
};
</script>

<style scoped>
.center-box {
  max-width: 500px;
  margin: 20px auto !important;
}
</style>
