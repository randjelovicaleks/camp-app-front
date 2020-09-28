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
      All caterers
    </v-tab>
    <v-tab>
      Reported caterers
      <v-badge
        :v-show="notificationCaterers > 0"
        :content="notificationCaterers"
        :value="notificationCaterers"
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
        :items="allCaterers"
        :hide-default-footer="true"
        class="elevation-1"
      >
      </v-data-table> 
    </v-tab-item>  

    <v-tab-item class="mt-3">
      <v-data-table
        :headers="headers"
        :items="activeCaterers"
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
      allCaterers: [],
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
      activeCaterers: [],
      token: JSON.parse(sessionStorage.getItem("token")),
      notificationCaterers: 0,
      snackbar: false,
      color: '',
      colorIcon: '',
      text: '',
      timeout: 2500,
      rerender: 1,
    };
  },
  created() {
    this.getAllCaterers();
    this.getNotification();
    this.getActiveCaterers();
  },
  methods: {
    getAllCaterers() {
      axios.get("http://localhost:8080/caterer").then((response) => {
        this.allCaterers = response.data;
      })
    },
    getActiveCaterers() {
      axios.get("http://localhost:8080/caterer/report").then((response) => {
        this.activeCaterers = response.data;
      })
    },
    getNotification() {
      axios.get("http://localhost:8080/caterer/notification").then((response) => {
        this.notificationCaterers = response.data;
      })
    },
    block(id) {
      axios.put(`http://localhost:8080/caterer/${id}/block`).then(() => {
        this.snackbar = true;
        this.color = "#137547";
        this.colorIcon = "#137547";
        this.text = "Caterer is blocked.";
        this.getNotification();
        this.getActiveCaterers();
        this.getAllCaterers();
        this.rerender += 1;
      }).catch(() => {
        this.snackbar = true;
        this.color = "red";
        this.colorIcon = "red";
        this.text = "Caterer is not blocked.";
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