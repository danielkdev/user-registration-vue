<template>
  <div class="contact-info">
    <div class="provious-info-tables">
      <PersonalInformation />
      <ProfessionalInformation />
      <AccountInformation />
      <ContactInformation />
    </div>

    <div>
      <form
        v-if="!user.contactInfo"
        novalidate
        class="md-layout"
        @submit.prevent="validateUser"
      >
        <md-card class="center-box md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">
              <h1>Contact Informations</h1>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('address')">
                  <label for="address">Address</label>
                  <md-input
                    name="address"
                    id="address"
                    autocomplete="given-name"
                    v-model="form.address"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.address.required"
                    >Address is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.address.minlength"
                    >Invalid Address</span
                  >
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('contact')">
                  <label for="contact">Contact</label>
                  <md-input
                    name="contact"
                    id="contact"
                    autocomplete="given-name"
                    v-model="form.contact"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.contact.required"
                    >Contact is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.contact.minlength"
                    >Invalid Contact</span
                  >
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Save and Submit</md-button
            >
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved">{{
          contactDetails
        }}</md-snackbar>
      </form>
      <md-button
        v-if="user.contactInfo"
        class="md-raised md-primary"
        v-on:click="removeCurrentUser"
        >Register New User</md-button
      >
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapMutations } from "vuex";
import PersonalInformation from "./PersonalInformation";
import ProfessionalInformation from "./ProfessionalInformation";
import AccountInformation from "./AccountInformation";
import ContactInformation from "./ContactInformation";

export default {
  name: "ContactInformationsForm",
  components: {
    PersonalInformation,
    ProfessionalInformation,
    AccountInformation,
    ContactInformation
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      address: null,
      contact: null
    },
    userSaved: false,
    sending: false,
    contactDetails: null
  }),
  validations: {
    form: {
      address: {
        required,
        minLength: minLength(3)
      },
      contact: {
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
      this.form.address = null;
      this.form.contact = null;
    },
    saveUser() {
      this.sending = true;
      this.saveContactInfo(this.form);

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.contactDetails = "User is registered.";
        this.userSaved = true;
        this.sending = false;
        // this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    removeCurrentUser() {
      this.clearUser();
      this.$router.push({ path: "/personal-information" });
    },
    ...mapMutations(["saveContactInfo", "clearUser"])
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    ...mapGetters(["getUser"])
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
