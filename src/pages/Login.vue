<template>
  <v-container>
    <div class="bg">
      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center" cols="12" sm="8" md="4">
          <v-card
            class="elevation-12 text-center bg-blur d-flex justify-center"
            width="400"
            height="350"
          >
            <v-col>
              <h2 class="title-c">Welcome</h2>
              <v-card-text class="d-flex justify-center">
                <v-form>
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
                  <p>
                    Don't have an account?
                    <router-link class="link-custom" to="/signup">Sign up</router-link>
                  </p>
                  <v-btn color="#137547" class="rounded-c btn-custom" dark @click="signin">Sign in</v-btn>
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
      email: '',
      password: '',
      token: null,
    }
  },
  methods: {
    signin: function() {
      axios
        .post("http://localhost:8080/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.token = response.data;
          sessionStorage.setItem("token", JSON.stringify(this.token));
          this.checkRole(this.token);
        })
        .catch(() => {
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
        });
    },
    checkRole: function(token) {
      if (token.role.authority == "ROLE_CAMPER") {
        console.log("CAMPER");
      } else if (token.role.authority == "ROLE_CATERER") {
        console.log("CATERER");
      } else if (token.role.authority == "ROLE_ADMIN") {
        console.log("ADMIN");
      }
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
  padding-top: 10%;
}

::-webkit-scrollbar {
  display: none;
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