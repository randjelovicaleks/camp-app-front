<template>
  <div>
    <Navigation color="#137547" className="white-btn" />
    <v-row class="mt-10 ml-15">
        <v-col>
          <v-card width="400px" class="text-center custom-padding" height="500px">
            <h3 class="title">Campsites with most comments</h3>
            <line-chart  :chartdata="mostCommentedChart" :options="options" :key="someKey"/>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400px" class="text-center custom-padding" height="500px">
            <h3 class="title">Campsites with top ratings</h3>
            <line-chart  :chartdata="bestRatedChart" :options="options" :key="someKey"/>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400px" class="text-center custom-padding" height="500px">
            <h3 class="title">Campsites with most reservations</h3>
            <line-chart  :chartdata="mostReservationChart" :options="options" :key="someKey"/>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import LineChart from '../components/LineChart';
import axios from 'axios';

export default {
  components: {
    Navigation,
    LineChart
  },
  data() {
    return {
      options: {maintainAspectRatio: false},
      bestRatedChart: {},
      mostCommentedChart: {},
      mostReservationChart: {},
      campsiteNames: ['campsite1', 'campsite1', 'campsite1'],
      token: JSON.parse(sessionStorage.getItem("token")),
      someKey: 0
    };
  },
  created() {
    axios.get('http://localhost:8080/campsite/best/rated').then((response) => {
      let campsites = response.data;

      this.bestRatedChart = {
        labels: campsites.map(x => x.name),
        datasets: [{
          label: 'Rating',
          borderColor: "rgba(19, 117, 71, 0.70)",
          backgroundColor: "rgba(19, 117, 71, 0.30)",
          data: campsites.map(x => x.rating)
        }],
        axisX: {
          labelWrap: true,
          labelMaxWidth: 10
        }
      }

      this.someKey += 1;
    });

    axios.get('http://localhost:8080/campsite/most/comment').then((response) => {
      let campsites = response.data;

      this.mostCommentedChart = {
        labels: campsites.map(x => x.campsiteName),
        datasets: [{
          label: 'Comments',
          borderColor: "rgba(19, 117, 71, 0.70)",
          backgroundColor: "rgba(19, 117, 71, 0.30)",
          data: campsites.map(x => x.numberOfComments)
        }],
        axisX: {
          labelWrap: true,
          labelMaxWidth: 10
        }
      }

      this.someKey += 1;
    });

    axios.get('http://localhost:8080/campsite/most/reservations').then((response) => {
      let campsites = response.data;
      this.mostReservationChart = {
        labels: campsites.map(x => x.campsiteName),
        datasets: [{
          label: 'Reservations',
          borderColor: "rgba(19, 117, 71, 0.70)",
          backgroundColor: "rgba(19, 117, 71, 0.30)",
          data: campsites.map(x => x.numberOfReservations)
        }],
        axisX: {
          labelWrap: true,
          labelMaxWidth: 10
        }
      }

      this.someKey += 1;
    });
  }
};
</script>

<style scoped>
.title {
  font-family: "Pacifico", cursive !important;
  color: #137547;
}

.custom-padding {
  padding-top: 10px;
}
</style>