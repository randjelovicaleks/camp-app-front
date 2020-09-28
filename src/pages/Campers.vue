<template>
  <div>
    <Navigation color="#137547" className="white-btn" :key="rerender" />
    <v-container class="text-center">
    <v-tabs
      background-color="transparent"
      grow
      color="#137547"
    >
    <v-tab>
      All campers
    </v-tab>
    <v-tab>
      Campers who canceled reservations
      <v-badge
        :v-show="notificationCampers > 0"
        :content="notificationCampers"
        :value="notificationCampers"
        offset-x="-5"
        offset-y="10"
        class="notification"
        color="#137547"
        bordered
        light
      >
      </v-badge>
    </v-tab>
    <v-tab-item class="mt-3">
      <v-data-table
        :headers="headersAll"
        :items="allCampers"
        :hide-default-footer="true"
        class="elevation-1"
      >
      </v-data-table> 
    </v-tab-item>  

    <v-tab-item class="mt-3">
      <v-data-table
        :headers="headers"
        :items="activeCampers"
        :hide-default-footer="true"
        class="elevation-1"
      >
      <template v-slot:[`item.action`]="{item}">
        <v-btn color="#137547" class="rounded-c btn-custom mr-3" dark @click="block(item.id)">Block</v-btn>
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
      allCampers: [],
      headersAll: [
        {text: 'Name', value: 'name', align: 'center'},
        {text: 'Surname', value: 'surname', align: 'center'},
        {text: 'Email', value: 'email', align: 'center'},
        {text: 'Status', value: 'userStatus', align: 'center'},
      ],
      headers: [
        {text: 'Name', value: 'name', align: 'center'},
        {text: 'Surname', value: 'surname', align: 'center'},
        {text: 'Email', value: 'email', align: 'center'},
        {text: 'Action', value: 'action', align: 'center', sortable: false},
      ],
      activeCampers: [],
      token: JSON.parse(sessionStorage.getItem("token")),
      notificationCampers: 0,
      snackbar: false,
      color: '',
      colorIcon: '',
      text: '',
      timeout: 2500,
      rerender: 1,
    };
  },
  created() {
    this.getAllCampers();
    this.getNotifications()
    this.getActiveCampers();  
  },
  methods: {
    getAllCampers() {
      axios.get("http://localhost:8080/camper").then((response) => {
      this.allCampers = response.data;
    })
    },
    getActiveCampers() {
      axios.get("http://localhost:8080/camper/canceled/reservation").then((response) => {
        this.activeCampers = response.data;
      })
    },
    getNotifications() {
      axios.get("http://localhost:8080/camper/notification").then((response) => {
        this.notificationCampers = response.data;
      })
    },
    block(id) {
      axios.put(`http://localhost:8080/camper/${id}/block`).then(() => {
        this.snackbar = true;
        this.color = "#137547";
        this.colorIcon = "#137547";
        this.text = "Camper is blocked."
        this.getNotifications();
        this.getActiveCampers();
        this.getAllCampers();
        this.rerender += 1;
      }).catch(() => {
        this.snackbar = true;
        this.color = "red";
        this.colorIcon = "red";
        this.text = "Camper is not blocked."
      })
    },
  },
};
</script>

<style scoped>
.rounded-c {
  border-radius: 15px !important;
  height: 30px !important;
}
</style>