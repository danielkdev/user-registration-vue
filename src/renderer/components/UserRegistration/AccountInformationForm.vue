<template>
  <div class="account-info">
    <div class="provious-info-tables">
      <PersonalInformation />
      <ProfessionalInformation />
    </div>

    <div class="account-info-form">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="center-box md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">
              <h1>Account Informations</h1>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('bankName')">
                  <label for="bank-name">Bank Name</label>
                  <md-input
                    name="bank-name"
                    id="bank-name"
                    autocomplete="given-name"
                    v-model="form.bankName"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.bankName.required"
                    >Bank name is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.bankName.minlength"
                    >Invalid Bank name</span
                  >
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('branchCode')">
                  <label for="branch-code">Branch Code</label>
                  <md-input
                    name="branch-code"
                    id="branch-code"
                    autocomplete="given-name"
                    v-model="form.branchCode"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.branchCode.required"
                    >Branch Code is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.branchCode.minlength"
                    >Invalid Branch Code</span
                  >
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('accountName')">
                  <label for="account-name">Name of Account</label>
                  <md-input
                    name="account-name"
                    id="account-name"
                    autocomplete="given-name"
                    v-model="form.accountName"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.accountName.required"
                    >Account name is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.accountName.minlength"
                    >Invalid Account Name</span
                  >
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('accountNumber')">
                  <label for="last-name">Account Number</label>
                  <md-input
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    v-model="form.accountNumber"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.accountNumber.required"
                    >Account Number is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.accountNumber.minlength"
                    >Account Number should be min 10</span
                  >
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Save and Next</md-button
            >
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved"
          >The user {{ accountDetails }} was saved with success!</md-snackbar
        >
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import PersonalInformation from "./PersonalInformation";
import ProfessionalInformation from "./ProfessionalInformation";
import { mapMutations } from "vuex";

export default {
  name: "AccountInformationsForm",
  components: { PersonalInformation, ProfessionalInformation },
  mixins: [validationMixin],
  data: () => ({
    form: {
      bankName: null,
      branchCode: null,
      accountName: null,
      accountNumber: null
    },
    userSaved: false,
    sending: false,
    accountDetails: null
  }),
  validations: {
    form: {
      bankName: {
        required,
        minLength: minLength(3)
      },
      branchCode: {
        required,
        minLength: minLength(4)
      },
      accountName: {
        required,
        maxLength: minLength(3)
      },
      accountNumber: {
        required,
        maxLength: minLength(10)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.bankName = null;
      this.form.branchCode = null;
      this.form.accountName = null;
      this.form.accountNumber = null;
    },
    saveUser() {
      this.sending = true;
      this.saveAccountInfo(this.form);

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.accountDetails = "Account Info is saved.";
        this.userSaved = true;
        this.sending = false;
        // this.clearForm();
        this.$router.push({ path: "/contact-information" });
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    ...mapMutations(["saveAccountInfo"])
  }
};
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.center-box {
  max-width: 500px;
  margin: 20px auto !important;
}
</style>
