<template>
  <v-card class="card">
    <v-row class="reset">
      <v-col class="reset">
        <v-img :src="campsite.images[0]" class="no-round aligment" width="280" height="200px">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon @click="remove" v-bind="attrs" v-on="on" large class="icon-style" color="#137547">mdi-delete</v-icon>
            </template>
            <span v-show="isFavourite">Remove from favourites</span>
            <span v-show="!isFavourite">Remove from shared</span>
          </v-tooltip>
        </v-img>
      </v-col>
      <v-col class="reset">
        <v-row class="reset" align="center" justify="right"><h3 class="neg-margin">{{campsite.name}}</h3></v-row>
        <v-row class="reset mt-2" align="center" justify="right"><b class="mr-2">Nearest city:</b>{{campsite.nearestCity}}</v-row>
        <v-row class="reset mt-2 mb-3" align="center" justify="right"><b class="mr-2">Price:</b>{{campsite.pricePerDay}}</v-row>
        <v-row class="reset" align="center" justify="right">
          <v-row class="reset" align="center" justify="right">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img class="svg" width="30" v-bind="attrs" v-on="on" src="../assets/landscape.svg" />
              </template>
              <span>Close to mountain</span>
            </v-tooltip>
            <p class="ml-2 mt-2" v-show="campsite.closeToMountain">Yes</p>
            <p class="ml-2 mt-2" v-show="!campsite.closeToMountain">No</p>
          </v-row>
          <v-row class="reset" align="center" justify="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img class="svg" width="30" v-bind="attrs" v-on="on" src="../assets/river.svg" />
              </template>
              <span>Close to river</span>
            </v-tooltip>
            <p class="ml-2 mt-2" v-show="campsite.closeToRiver">Yes</p>
            <p class="ml-2 mt-2" v-show="!campsite.closeToRiver">No</p>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    campsite: Object,
    isFavourite: Boolean
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
    }
  },
  methods: {
    remove() {
      if(this.isFavourite) {
        axios.delete(`http://localhost:8080/campsite/${this.campsite.id}/favourite/camper/${this.token.id}`).then(() => {
          this.$emit('clicked');
        });
      } else {
        axios.delete(`http://localhost:8080/campsite/${this.campsite.id}/sharing/camper/${this.token.id}`).then(() => {
          this.$emit('clicked');
        })
      }
    }
  },
}
</script>

<style scoped>
.card {
  width: 480px;
  height: 200px;
  padding: 0;
}

.aligment {
  margin-left: -50px !important;
  margin-top: -25px !important;
}

.no-round {
  border-radius: 7px 0 0 7px !important;
}

.neg-margin {
  margin-top: -10px;
}

.reset {
  padding: 0;
  margin: 0;
}

.icon-style {
  position: relative;
  cursor: pointer;
  right: 90px;
  margin: 5px;
}
</style>