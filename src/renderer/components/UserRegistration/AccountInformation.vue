<template>
  <div v-if="userAccountInfo" class="account-info-table">
    <md-table class="center-box" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Account Informations</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-cell>Bank Name</md-table-cell>
        <md-table-cell>{{ userAccountInfo.bankName }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Branch Code</md-table-cell>
        <md-table-cell>{{ userAccountInfo.branchCode }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Account Name</md-table-cell>
        <md-table-cell>{{ userAccountInfo.accountName }}</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Account Number</md-table-cell>
        <md-table-cell>{{ userAccountInfo.accountNumber }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AccountInformation",
  computed: {
    userAccountInfo() {
      return this.$store.getters.getUserAccountInfo;
    },
    ...mapGetters(["getUserAccountInfo"])
  }
};
</script>

<style scoped>
.center-box {
  max-width: 500px;
  margin: 20px auto !important;
}
</style>
