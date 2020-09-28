<template>
  <div>
    <Navigation color="#137547" className="white-btn" :key="rerender" /> <!-- navKey postavljen kao kljuc komponente jer se na promenu kljuca -->
    <v-container class="text-center">                                  <!-- re renderuje komponenta pa smo tako resetovali notifikacije. Pogledati foreceRerender() metodu dole -->
    <v-tabs
      background-color="transparent"
      grow
      color="#137547"
    >
    <v-tab>
      Pending reservations
    </v-tab>
    <v-tab>
      Other reservations
    </v-tab>
    <v-tab-item class="mt-3">
      <v-data-table
        :headers="headers"
        :items="pendingReservations"
        :hide-default-footer="true"
        class="elevation-1"
      >
      <template v-slot:[`item.startDate`]="{item}">
        {{`${item.startDate[2]}-${item.startDate[1]}-${item.startDate[0]}`}}
      </template>
      <template v-slot:[`item.endDate`]="{item}">
        {{`${item.endDate[2]}-${item.endDate[1]}-${item.endDate[0]}`}}
      </template>
      <template v-slot:[`item.camperName`]="{item}">
        {{`${item.camperDTO.name} ${item.camperDTO.surname}`}}
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <v-btn color="#137547" class="rounded-c btn-custom mr-3" dark @click="accept(item.id)" v-show="token.role.authority === 'ROLE_CATERER'">Accept</v-btn>
        <v-btn color="#137547" class="rounded-c btn-custom" dark @click="reject(item.id)" v-show="token.role.authority === 'ROLE_CATERER'">Reject</v-btn>
        <v-btn color="#137547" class="rounded-c btn-custom" dark @click="cancel(item.id)" v-show="token.role.authority === 'ROLE_CAMPER'">Cancel</v-btn>
      </template>
      </v-data-table> 
    </v-tab-item>  
    <!-- ****************************************** -->
    <v-tab-item class="mt-3">
      <v-data-table
        :headers="otherHeaders"
        :items="otherReservations"
        :hide-default-footer="true"
        class="elevation-1"
      >
      <template v-slot:[`item.startDate`]="{item}">
        {{`${item.startDate[2]}-${item.startDate[1]}-${item.startDate[0]}`}}
      </template>
      <template v-slot:[`item.endDate`]="{item}">
        {{`${item.endDate[2]}-${item.endDate[1]}-${item.endDate[0]}`}}
      </template>
      <template v-slot:[`item.camperName`]="{item}">
        {{`${item.camperDTO.name} ${item.camperDTO.surname}`}}
      </template>
      </v-data-table> 
    </v-tab-item>        
    </v-tabs>
    </v-container>
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
          :color="colorIcon"
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
import Navigation from "../components/Navigation";
import axios from 'axios';

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      headers: [
        {text: 'Campsite name', value: 'campsiteDTO.name', align:'center'},
        {text: 'Start date', value: 'startDate', align:'center'},
        {text: 'End date', value: 'endDate', align:'center'},
        {text: "Camper's name", value: 'camperName', align:'center'},
        {text: "Camper's email", value: 'camperDTO.email', align:'center'},
        {text: 'Actions', value: 'actions', align:'center', sortable: false}
      ],
      pendingReservations: [],
      otherHeaders: [
        {text: 'Campsite name', value: 'campsiteDTO.name', align:'center'},
        {text: 'Start date', value: 'startDate', align:'center'},
        {text: 'End date', value: 'endDate', align:'center'},
        {text: "Camper's name", value: 'camperName', align:'center'},
        {text: "Camper's email", value: 'camperDTO.email', align:'center'},
        {text: 'Reservation status', value: 'reservationType', align:'center'},
      ],
      otherReservations: [],
      token: JSON.parse(sessionStorage.getItem("token")),
      timeout: 2500,
      snackbar: false,
      color: '',
      colorIcon: '',
      text: '',
      rerender: 1,
    };
  },
  created() {   
      this.getReservationForCaterer();    
      this.getReservationForCamper();       
  },
  methods: {
    getReservationForCamper() {
      if (this.token.role.authority === 'ROLE_CAMPER') {
        axios.get(`http://localhost:8080/reservation/pending/camper/${this.token.id}`).then((response) => {
          this.pendingReservations = response.data;
        });

        axios.get(`http://localhost:8080/reservation/camper/${this.token.id}`).then((response) => {
          this.otherReservations = response.data;
        })
      } 
    },
    getReservationForCaterer() {
      if (this.token.role.authority === 'ROLE_CATERER') {
        axios.get(`http://localhost:8080/reservation/pending/caterer/${this.token.id}`).then((response) => {
          this.pendingReservations = response.data;
        });

        axios.get(`http://localhost:8080/reservation/caterer/${this.token.id}`).then((response) => {
          this.otherReservations = response.data;
        })
      }
    },
    forceRerender() {
      this.rerender += 1;
    },
    snackbarSuccess() {
      this.snackbar = true;
      this.color = "#137547";
      this.colorIcon = "#137547";
    },
    snackbarError() {
      this.snackbar = true;
      this.color = "red";
      this.colorIcon = "red";
    },
    accept(id) {
      axios.put(`http://localhost:8080/reservation/${id}/accept`).then(() => {
        this.snackbarSuccess();
        this.text = "Reservation is accepted."
      }).catch(() => {
        this.snackbarError();
        this.text = "Reservation is not accepted."
      }).then(() => {
        this.getReservationForCaterer();
        this.forceRerender()
      })
    },
    reject(id) {
      axios.put(`http://localhost:8080/reservation/${id}/reject`).then(() => {
        this.snackbarSuccess();
        this.text = "Reservation is rejected."
      }).catch(() => {
        this.snackbarError();
        this.text = "Reservation is not rejected."
      }).then(() => {
        this.getReservationForCaterer();
        this.forceRerender()
      })
    },
    cancel(id) {
      axios.put(`http://localhost:8080/reservation/${id}/cancel`).then(() => {
        this.snackbarSuccess();
        this.text = "Reservation is canceled."
      }).catch(() => {
        this.snackbarError();
        this.text = "Reservation is not canceled."
      }).then(() => {
        this.getReservationForCamper();
      })
    }
  },
};
</script>

<style scoped>
.rounded-c {
  border-radius: 15px !important;
  height: 30px !important;
}
</style>