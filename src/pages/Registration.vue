<template>
  <v-container>
    <div class="bg">
      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center" cols="12" sm="8" md="4">
          <v-card
            class="elevation-12 text-center bg-blur d-flex justify-center"
            width="400"
            height="600"
          >
            <v-col>
              <h2 class="title-c">Welcome</h2>
              <v-card-text class="d-flex justify-center">
                <v-form>
                  <v-text-field
                    label="First name"
                    class="rounded-c width-c"
                    name="firstname"
                    type="text"
                    color="#137547"
                    outlined
                    dense
                    v-model="name"
                  ></v-text-field>

                  <v-text-field
                    label="Last name"
                    class="rounded-c width-c"
                    name="lastname"
                    type="text"
                    color="#137547"
                    outlined
                    dense
                    v-model="surname"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    class="rounded-c width-c"
                    name="email"
                    type="email"
                    color="#137547"
                    outlined
                    dense
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    class="rounded-c width-c"
                    name="password"
                    type="password"
                    color="#137547"
                    outlined
                    dense
                    v-model="password"
                  ></v-text-field>

                  <v-text-field
                    id="confirmPassword"
                    label="Confirm password"
                    class="rounded-c width-c"
                    name="confirmPassword"
                    type="password"
                    color="#137547"
                    outlined
                    dense
                    v-model="confirmPassword"
                  ></v-text-field>

                  <v-select
                    :items="userType"
                    label="User type"
                    class="rounded-c width-c"
                    color="#137547"
                    dense
                    outlined
                    v-model="userType"
                  ></v-select>

                  <p>
                    Already have an account?
                    <router-link class="link-custom" to="/signin">Sign in</router-link>
                  </p>
                  <v-btn color="#137547" class="rounded-c btn-custom" dark @click="signup">Sign up</v-btn>
                </v-form>
              </v-card-text>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
      return {
        userType: [{value: 'CAMPER', text: 'Camper'}, {value: 'CATERER', text: 'Caterer'}],
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        registrationRequestDTO: null,
      }
    },
     methods: {
    signup: function() {
      axios.post("http://localhost:8080/auth/registration", {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          userType: this.userType
        })
        .then(data => {
            this.registrationRequestDTO = data.registrationRequestDTO; 
            this.$router.push("signin");                  
        })
    }
  }
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
  padding-top: 3%;
}

.rounded-c {
  border-radius: 15px !important;
}

.btn-custom {
  width: 160px !important;
  height: 40px !important;
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
</style>