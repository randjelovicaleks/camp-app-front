<template>
  <div class="background">
    <v-container>
      <v-row>
      <v-col cols="6"><v-row><h1 class="logo">Camping spot</h1></v-row></v-col>
      <v-col class="header" cols="6">
        <v-row justify="center">
          <h1 class="title-c">
            Find best campsites for you and your friends 
          </h1>
        </v-row>
        <v-row class="mt-7">
          <v-btn color="#137547" class="mr-3 btn-c rounded-c"><router-link to="/signin" class="custom-link">Sign in</router-link></v-btn>
          <v-btn color="#137547" class="btn-c rounded-c"><router-link to="/signup" class="custom-link">Sign up</router-link></v-btn>
        </v-row>
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.background {
  height: 100vh;
  width: 100vw;

  background: url("../assets/blured.jpg") no-repeat bottom center;
  background-size: cover;
}

.title-c {
  font-family: "Pacifico", cursive;
  color: #137547;
  font-size: 45px;
  padding-top: 15px;

  text-shadow: -1.4px -1.4px 0px #0b4429;
  animation: 1s ease-out 0s 1 slideInFromRight;
}

.logo {
  font-family: "Pacifico", cursive;
  font-size: 30px;
  padding: 10px;
  color:#137547;
}

.btn-c {
  color: #fff !important;
  width: 160px;
  height: 40px !important;

  animation: 1s ease-out 0s 1 slideInFromRight;
}

.header {
  margin-top: 12%;
}

.rounded-c {
  border-radius: 15px !important;
}

.custom-link {
  text-decoration: none;
  color: #fff;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(180%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>