<template>
<div>
  <v-card class="card-overal elevation-12">
    <v-img class="align-end no-round" height="200px" :src="campsite.images[0]">
      <v-icon v-show="showHeart" @click="removeFromFavourites" large class="heart-style" color="#137547" v-if="token.role.authority === 'ROLE_CAMPER'">mdi-cards-heart</v-icon>
      <v-icon v-show="!showHeart" @click="addToFavourites" large class="heart-style" color="#137547" v-if="token.role.authority === 'ROLE_CAMPER'">mdi-heart-outline</v-icon>
    </v-img>
    <v-card-text class="text-center">
      <h3>{{campsite.name}}</h3>
      <v-row class="mt-2 d-flex" width="100%" justify="center" align="center">
        <v-rating :readonly="true" v-model="campsite.rating" dense color="#FFD700" background-color="#FFD700" half-increments></v-rating>
        <div class="grey--text ml-4">{{campsite.rating}}</div>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#137547" dense class="rounded-c btn-custom" v-show="!isTopSpot" dark v-if="token.role.authority === 'ROLE_CAMPER'" @click="reserve">Reserve</v-btn>
      <v-btn color="#137547" dense class="rounded-c btn-custom mr-2" dark><router-link class="link-reset" :to="`/details/${campsite.id}?topspot=${isTopSpot}`">Details</router-link></v-btn>
    </v-card-actions>
  </v-card>

  <v-snackbar
      v-model="snackbar"
      :color="color"
      :right="true"
      :timeout="timeout"
      :top="true"
      text
    >
      {{text}}
      <template v-slot:action="{ attrs }">
        <v-icon
          color="#137547"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          mdi-close
        </v-icon>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
      campsite: Object,
      isTopSpot: Boolean
    },
    data() {
      return {
        showHeart: false,
        token: JSON.parse(sessionStorage.getItem("token")),
        reservationDTO: {},
        startDate: JSON.parse(localStorage.getItem("startDate")),
        endDate: JSON.parse(localStorage.getItem("endDate")),
        camperDTO: {},
        snackbar: false,
        text: '',
        timeout: 2500,
        color: '',
      }
    },
    created() {
      if(this.token.role.authority === 'ROLE_CAMPER') {
        axios.get("http://localhost:8080/camper/" + this.token.id).then(response => {
          this.camperDTO = response.data;
        }).then(() => {
          for(let c of this.camperDTO.favouriteCampsites) {
            if(c.id === this.campsite.id) {
              this.showHeart = true;
            }
          }
        });
      }
    },
    methods: {
      addToFavourites() {
        axios.put(`http://localhost:8080/campsite/${this.campsite.id}/favourite/camper/${this.token.id}`).then(() => {
          this.showHeart = !this.showHeart
        })        
      },
      removeFromFavourites() {
        axios.delete(`http://localhost:8080/campsite/${this.campsite.id}/favourite/camper/${this.token.id}`).then(() => {
          this.showHeart = !this.showHeart
        })
      },
      reserve() {
        axios.post("http://localhost:8080/reservation", {
          startDate: this.startDate,
          endDate: this.endDate,
          camperDTO: this.camperDTO,
          campsiteDTO: this.campsite
        }).then((response) => {
          this.reservationDTO = response.reservationDTO;
          this.snackbar = true;  
          this.color = "#137547";
          this.text = "Your reservation is successfully created.";         
        }).catch(() => {
          this.snackbar = true;
          this.color = "red";
          this.text = "Your reservation is not created.";
        })
      },
    }
};
</script>

<style scoped>
.card-overal {
  width: 300px !important;
  height: 350px !important;
  border-radius: 17px !important;
}

.no-round {
  border-radius: 17px 17px 0 0 !important;
}

.rounded-c {
  border-radius: 15px !important;
}

.heart-style {
  position: relative;
  cursor: pointer;
  top: -160px;
  left: 120px;
}

.link-reset {
  text-decoration: none;
  color: #fff;
}
</style>