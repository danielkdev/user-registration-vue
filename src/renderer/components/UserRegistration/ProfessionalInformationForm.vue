<template>
  <div class="professional-info">
    <div class="provious-info-tables">
      <PersonalInformation />
    </div>
    <div>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="center-box md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">
              <h1>Professional Informations</h1>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('designation')">
                  <label for="designation">Designation</label>
                  <md-input
                    name="designation"
                    id="designation"
                    autocomplete="given-name"
                    v-model="form.designation"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.designation.required"
                    >Designation is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.designation.minlength"
                    >Invalid Designation</span
                  >
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('institute')">
                  <label for="institute">Institute</label>
                  <md-input
                    name="institute"
                    id="institute"
                    autocomplete="given-name"
                    v-model="form.institute"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.institute.required"
                    >Institute is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.institute.minlength"
                    >Invalid Institute</span
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

        <md-snackbar :md-active.sync="userSaved">{{
          professionalDetails
        }}</md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
import PersonalInformation from "./PersonalInformation";

export default {
  name: "ProfessionalInformationsForm",
  components: { PersonalInformation },
  mixins: [validationMixin],
  data: () => ({
    form: {
      designation: null,
      institute: null
    },
    userSaved: false,
    sending: false,
    professionalDetails: null
  }),
  validations: {
    form: {
      designation: {
        required,
        minLength: minLength(3)
      },
      institute: {
        required,
        minLength: minLength(4)
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
      this.form.designation = null;
      this.form.institute = null;
    },
    saveUser() {
      this.sending = true;
      this.saveProfessionalInfo(this.form);

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.professionalDetails = "Professional Info is saved.";
        this.userSaved = true;
        this.sending = false;
        // this.clearForm();
        this.$router.push({ path: "/account-information" });
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    ...mapMutations(["saveProfessionalInfo"])
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
