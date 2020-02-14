<template>
  <div v-if="userContactInfo" class="contact-info-table">
    <md-table class="center-box" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Contact Informations</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-cell>Address</md-table-cell>
        <md-table-cell>{{ userContactInfo.address }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Contact</md-table-cell>
        <md-table-cell>{{ userContactInfo.contact }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContactInformation",
  computed: {
    userContactInfo() {
      return this.$store.getters.getUserContactInfo;
    },
    ...mapGetters(["getUserContactInfo"])
  }
};
</script>

<style scoped>
.center-box {
  max-width: 500px;
  margin: 20px auto !important;
}
</style>
