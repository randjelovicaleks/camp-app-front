<template>
  <v-container>
    <div class="bg">
      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center" cols="12" sm="8" md="4">
          <v-card
            class="elevation-12 text-center bg-blur d-flex justify-center"
            width="400"
            :height="selected === 'CATERER' ? 660 : 600"
          >
            <v-col>
              <h2 class="title-c">Welcome</h2>
              <v-card-text class="d-flex justify-center">
                <ValidationObserver ref="obs">
                  <v-form>
                    <ValidationProvider name="User type" :rules="{required: true}">
                      <v-select
                        slot-scope="{
                            errors,
                            valid
                          }"
                        :error-messages="errors"
                        :success="valid"
                        :items="userType"
                        label="User type"
                        class="rounded-c width-c"
                        color="#137547"
                        dense
                        outlined
                        item-color="#137547"
                        v-model="selected"
                        name="userType"
                      ></v-select>
                    </ValidationProvider>
                    <ValidationProvider
                      name="First name"
                      :rules="{required: true, alpha_spaces: true}"
                    >
                      <v-text-field
                        slot-scope="{
                            errors,
                            valid
                          }"
                        :error-messages="errors"
                        :success="valid"
                        label="First name"
                        class="rounded-c width-c"
                        name="firstname"
                        type="text"
                        color="#137547"
                        outlined
                        dense
                        v-model="name"
                        autocomplete="off"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Last name"
                      :rules="{required: true, alpha_spaces: true}"
                    >
                      <v-text-field
                        slot-scope="{
                            errors,
                            valid
                          }"
                        :error-messages="errors"
                        :success="valid"
                        label="Last name"
                        class="rounded-c width-c"
                        name="lastname"
                        type="text"
                        color="#137547"
                        outlined
                        dense
                        v-model="surname"
                        autocomplete="off"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Email"
                      :rules="{required: true, regex: /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/ }"
                    >
                      <v-text-field
                        slot-scope="{
                            errors,
                            valid
                          }"
                        :error-messages="errors"
                        :success="valid"
                        label="Email"
                        class="rounded-c width-c"
                        name="email"
                        type="email"
                        color="#137547"
                        outlined
                        dense
                        v-model="email"
                        autocomplete="off"
                      ></v-text-field>
                    </ValidationProvider>
                    <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                    <ValidationProvider
                      name="Password"
                      :rules="{required: true, regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,}$/ }"
                    >                   
                      <v-text-field
                        slot-scope="{
                            errors,
                            valid
                          }"
                        :error-messages="errors"
                        :success="valid"
                        id="password"
                        label="Password"
                        class="rounded-c width-c"
                        name="password"
                        type="password"
                        color="#137547"
                        outlined
                        dense
                        v-model="password"
                        autocomplete="off"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </ValidationProvider>
                    </template>
                      <span>Password must contain at least 1 uppercase letter, 1 lowercase letter, <br> 1 digit, 1 special character and must be minimum 8 characters long</span>
                    </v-tooltip>
                    <ValidationProvider
                      name="confirm"
                      rules="required|password:@Password"
                    >
                    <v-text-field
                      slot-scope="{
                        errors,
                        valid
                      }"
                      :error-messages="errors"
                      :success="valid"
                      id="confirmPassword"
                      label="Confirm password"
                      class="rounded-c width-c"
                      name="confirmPassword"
                      type="password"
                      color="#137547"
                      outlined
                      dense
                      v-model="confirmPassword"
                      autocomplete="off"
                    ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      v-show="selected === 'CATERER'"
                      name="Phone number"
                      :rules="selected === 'CATERER'? {required: true, numeric: true, min: 9, max: 11 } : ''"
                    >
                      <v-text-field
                        label="Phone number"
                        class="rounded-c width-c"
                        name="phonenumber"
                        type="text"
                        color="#137547"
                        outlined
                        dense
                        v-model="phoneNumber"
                        autocomplete="off"
                        v-show="selected === 'CATERER'"
                      ></v-text-field>
                    </ValidationProvider>
                    <p>
                      Already have an account?
                      <router-link class="link-custom" to="/signin">Sign in</router-link>
                    </p>
                    <v-btn color="#137547" class="rounded-c btn-custom" dark @click="signup">Sign up</v-btn>
                  </v-form>
                </ValidationObserver>
              </v-card-text>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="custom-bg mb-2" :color="color">Registration</v-card-title>
          <v-card-text>{{text}}</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="rounded-c btn-custom-dialog" text @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar
      v-model="snackbar"
      color="red"
      :right="true"
      :timeout="timeout"
      :top="true"
      text
    >
      {{snackbarText}}
      <template v-slot:action="{ attrs }">
        <v-icon
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          mdi-close
        </v-icon>
      </template>
    </v-snackbar>
  </v-container>
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
  data() {
    return {
      userType: [
        { value: "CAMPER", text: "Camper" },
        { value: "CATERER", text: "Caterer" },
      ],
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      phoneNumber: "",
      selected: null,
      registrationRequestDTO: null,
      dialog: false,
      text: "",
      color: "",
      snackbar: false,
      timeout: 2500,
      snackbarText: '',
    };
  },
  methods: {
    signup() {
      this.$refs.obs.validate();
      axios.post("http://localhost:8080/auth/registration", {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
          userType: this.selected,
        }).then((response) => {
          this.registrationRequestDTO = response.data;
          this.dialog = true;
          this.text =
            "To complite registration, please check your email address. We sent you email with activation link to activate your account. Thank you for believing in us.";
          this.color = "#137547";
          this.clear();
        }).catch((error) => {
          if(this.name && this.surname && this.email && this.password && this.selected 
            && (this.phoneNumber || this.selected == 'CAMPER') && this.password && this.confirmPassword) {
            if(error.response.status === 406){
              this.snackbar = true;
              this.snackbarText = "This email is already in use. Please try with another email."
            } else {
              this.snackbar = true;
              this.snackbarText = "Registration is failed. Please try again."
            }
          }
        });
    },
    clear() {
      this.name = null;
      this.surname = null;
      this.email = null;
      this.password = null;
      this.confirmPassword = null;
      this.phoneNumber = null;
      this.$refs.obs.reset();
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/blured.jpg") no-repeat bottom center;
  background-size: cover;
  overflow: hidden;
  padding-top: 2%;
}

.rounded-c {
  border-radius: 15px !important;
}

.btn-custom {
  width: 160px !important;
  height: 40px !important;
}

.btn-custom-dialog {
  width: 100px !important;
  height: 40px !important;
  color: #fff !important;
  background-color: #137547; 
}

.link-custom {
  text-decoration: none;
  color: #137547 !important;
}

.link-custom:visited {
  color: #137547 !important;
}

.title-c {
  font-family: "Pacifico", cursive;
  color: #137547;
  font-size: 30px;
  padding-top: 15px;
}

.bg-blur {
  background-color: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(8px) !important;
}

.white-font {
  color: #fff;
}

.width-c {
  width: 300px !important;
}

.custom-bg {
  background-color: #137547; 
  height: 60px;
  color: #fff;
}
</style>