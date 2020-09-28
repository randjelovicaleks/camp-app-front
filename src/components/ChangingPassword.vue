<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <a href="#" class="custom-link" v-bind="attrs" v-on="on">Change password</a>
      </template>
      <v-card>
        <div class="custom-bg d-flex align-center">
          <v-row justify="center">
            <h3>Changing password</h3>
          </v-row>
        </div>
        <v-card-text>
            <v-container>
              <ValidationObserver ref="obs">
              <v-row class="mt-4" justify="center">
                <ValidationProvider name="Old password" :rules="{required: true}">
                  <v-text-field
                    slot-scope="{
                          errors,
                          valid
                        }"
                    :error-messages="errors"
                    :success="valid"
                    label="Old password"
                    class="rounded-c width-c"
                    name="oldPassword"
                    type="password"
                    color="#137547"
                    outlined
                    dense
                    v-model="oldPassword"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-row>
              <v-row justify="center">
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <ValidationProvider name="New password" :rules="{required: true, regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,}$/}">
                  <v-text-field
                    slot-scope="{
                          errors,
                          valid
                        }"
                    :error-messages="errors"
                    :success="valid"
                    label="New password"
                    class="rounded-c width-c"
                    name="newPassword"
                    type="password"
                    color="#137547"
                    outlined
                    dense
                    v-model="newPassword"
                    autocomplete="off"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </ValidationProvider>
                </template>
                  <span>Password must contain at least 1 uppercase letter, 1 lowercase letter, <br> 1 digit, 1 special character and must be minimum 8 characters long</span>
                </v-tooltip>
              </v-row>
              <v-row justify="center">
                <ValidationProvider
                  name="confirm"
                  rules="required|password:@New password"
                >
                <v-text-field
                  slot-scope="{
                      errors,
                      valid
                    }"
                  :error-messages="errors"
                  :success="valid"
                  label="Confirm new password"
                  class="rounded-c width-c"
                  name="confirmNewPassword"
                  type="password"
                  color="#137547"
                  outlined
                  dense
                  v-model="confirmNewPassword"
                  autocomplete="off"
                ></v-text-field>
                </ValidationProvider>
              </v-row>
              </ValidationObserver>
            </v-container>        
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#137547"
            width="100"
            dense
            class="rounded-c btn-custom mr-1"
            dark
            @click="dialog = false"
          >Close</v-btn>
          <v-btn ref="btn" color="#137547" dense class="rounded-c btn-custom" dark @click="change">Save</v-btn>
        </v-card-actions>
        <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true" text>
          {{text}}
          <template v-slot:action="{ attrs }">
            <v-icon :color="colorIcon" text v-bind="attrs" @click="snackbar = false">mdi-close</v-icon>
          </template>
        </v-snackbar>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { extend } from 'vee-validate';

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

export default {
  props: {
    className: String,
  },
  data() {
    return {
      dialog: false,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      changePasswordDTO: null,
      token: JSON.parse(sessionStorage.getItem("token")),
      snackbar: false,
      timeout: 2500,
      color: "",
      colorIcon: "",
      text: "",
    };
  },
  methods: {
    change() {
      this.$refs.obs.validate();
      axios.post("http://localhost:8080/change-password", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }).then((response) => {
          this.changePasswordDTO = response.data;
          this.snackbar = true;
          this.color = "#137547";
          this.colorIcon = "#137547";
          this.text = "Password is successfully changed.";
          this.clear();
          setTimeout(() => {
            this.dialog = false;
          }, 2700);
        }).catch(() => {
          if(this.oldPassword && this.newPassword && this.confirmNewPassword) {
            this.clear();
            this.snackbar = true;
            this.color = "red";
            this.colorIcon = "red";
            this.text = "Password is not changed.";
          }
        });
    },
    clear() {
      this.oldPassword = null;
      this.newPassword = null;
      this.confirmNewPassword = null;
      this.$refs.obs.reset();
    }
  },
};
</script>

<style scoped>
.rounded-c {
  border-radius: 15px !important;
}

.width-c {
  width: 300px !important;
}

.custom-bg {
  background-color: #137547;
  height: 60px;
  color: #fff;
}

.btn-custom {
  height: 35px !important;
  width: 100px;
}

.white-btn {
  color: #137547;
  background-color: #fff !important;
}

.green-btn {
  color: #fff;
  background-color: #137547 !important;
}

.rounded-c {
  border-radius: 15px !important;
}

.custom-link {
  text-decoration: none;
  color: #137547;
}
</style>