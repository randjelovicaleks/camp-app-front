<template>
  <v-container>
    <div class="bg">
      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center">
          <v-card
            class="elevation-12 text-center bg-blur d-flex justify-center"
            width="400"
            height="200"
          >
            <v-col>
              <h2 class="title-c">Account activation</h2>
              <v-card-text>
                <v-form>
                <v-btn color="#137547" class="rounded-c btn-custom mt-3" dark @click="activateAccount">Activate account</v-btn>
                </v-form>
              </v-card-text>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-snackbar
      v-model="snackbar"
      color="red"
      :right="true"
      :timeout="timeout"
      :top="true"
      text
    >
      Activation account failed!
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
import axios from 'axios';

export default {
  data() {
    return {
      snackbar: false,
      timeout: 2500,
    };
  },
  methods: {
    activateAccount() {
      const requestId = this.$route.query.id;
      const requestToken = this.$route.query.token;
      if (requestId && requestToken) {
        axios.put(`http://localhost:8080/activate-account/request/${requestId}/${requestToken}`).then(() => {
          this.$router.push("signin"); 
        }).catch(() => {
          this.snackbar = true;
        })
      } else {
        this.snackbar = true;
      }
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
  padding-top: 10%;
}

.bg-blur {
  background-color: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(8px) !important;
}

.btn-custom {
  width: 175px !important;
  height: 40px !important;
}

.rounded-c {
  border-radius: 15px !important;
}

.title-c {
  font-family: "Pacifico", cursive;
  color: #137547;
  font-size: 30px;
  padding-top: 15px;
}
</style>