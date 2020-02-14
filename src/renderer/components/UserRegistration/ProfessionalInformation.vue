<template>
  <div v-if="userProfessionalInfo" class="professional-info-table">
    <md-table class="center-box" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Professional Informations</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-cell>Designation</md-table-cell>
        <md-table-cell>{{ userProfessionalInfo.designation }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Institute</md-table-cell>
        <md-table-cell>{{ userProfessionalInfo.institute }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfessionalInformation",
  computed: {
    userProfessionalInfo() {
      return this.$store.getters.getUserProfessionalInfo;
    },
    ...mapGetters(["getUserProfessionalInfo"])
  }
};
</script>

<style scoped>
.center-box {
  max-width: 500px;
  margin: 20px auto !important;
}
</style>
