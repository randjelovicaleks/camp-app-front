<template>
  <div>
    <v-col>
      <div class="bg d-flex">
        <v-col>
          <Navigation color="rgba(0, 0, 0, 0)" className="green-btn" />
        </v-col>
      </div>
      <SearchBar class="position blur-effect" @clicked="onSearchClick" />
      <div class="top-section-results text-center" v-show="campsites.length === 0 && searched === false">
        <h2 class="title">Top campsites our campers choose</h2>
         <v-row class="d-flex">
          <div class="margin-c" v-for="campsite in bestRatedCampsites" :key="campsite.id">
            <Card :campsite="campsite" :isTopSpot="true" />
          </div>
        </v-row>
      </div>

      <v-row class="top-section" justify="center" v-show="campsites.length === 0 && searched === true">
        <h2 class="green-text">There is no results for this search</h2>
      </v-row>

      <div class="top-section-results text-center" v-show="campsites.length > 0">
        <v-row class="d-flex">
          <div class="margin-c" v-for="campsite in campsites" :key="campsite.id">
            <Card :campsite="campsite"/>
          </div>
        </v-row>
      </div>
    </v-col>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import axios from 'axios';

export default {
  components: {
    Navigation,
    SearchBar,
    Card,
  },
  data() {
    return {
      campsites: [],
      bestRatedCampsites: [],
      searched: false
    };
  },
  created() {
     axios.get("http://localhost:8080/campsite/best/rated").then((response) => {
        this.bestRatedCampsites = response.data;
     })
  },
  methods: {
    onSearchClick: function (value) {
      this.campsites = value.data;
      this.searched = value.searched
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.bg {
  width: 100%;
  height: 60%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/1_croped.jpg") no-repeat bottom;
  background-size: cover;
  overflow: hidden;
}

.position {
  position: absolute;
  margin-top: 15%;
  margin-left: 16.5%;
}

.blur-effect {
  background-color: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(8px) !important;
}

.top-section {
  position: absolute;
  margin-top: 30%;
  padding-left: 70px;
  padding-right: 70px;
  height: 60vh;
  width: 100% !important;
}

.title {
  font-family: "Pacifico", cursive !important;
  color: #137547;
  font-size: 35px !important;
  margin-bottom: 30px !important;
  margin-left: -50px;
}

.top-section-results {
  position: absolute;
  margin-top: 30%;
  margin-left: 7%;
  padding-left: 150px;
  padding-right: 150px;
  height: 60vh;
  width: 1400px !important;
}

.margin-c {
  margin: 20px;
}

.green-text {
  color: #137547;
}
</style>