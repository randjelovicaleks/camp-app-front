<template>
  <nav class="nav-custom">
    <v-app-bar :color="color" dark elevation="0" class="padding-c">
      <v-toolbar-title class="logo">Camping spot</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :class="'rounded-c btn-custom mr-2 ' + className" @click="search">Search</v-btn>
      <v-btn :class="'rounded-c btn-custom mr-2 ' + className" v-show="this.token.role.authority === 'ROLE_CATERER'" @click="createCampsite">Add campsite</v-btn>
      <v-badge
        :v-show="notification > 0"
        :content="notification"
        :value="notification"
        offset-x="25"
        offset-y="9"
        class="notification"
        color="#137547"
        overlap
        bordered
        light
      >
        <v-btn :class="'rounded-c btn-custom mr-2 ' + className" v-show="this.token.role.authority === 'ROLE_CATERER'" @click="reservations">Reservations</v-btn>
      </v-badge>
      <v-btn :class="'rounded-c btn-custom mr-2 ' + className" v-show="this.token.role.authority === 'ROLE_CAMPER'" @click="reservations">Reservations</v-btn>
      <v-btn :class="'rounded-c btn-custom mr-2 ' + className" v-show="this.token.role.authority === 'ROLE_CAMPER'" @click="profile">Profile</v-btn>
      <v-badge
        :v-show="notificationCampers > 0"
        :content="notificationCampers"
        :value="notificationCampers"
        offset-x="25"
        offset-y="9"
        class="notification"
        color="#137547"
        overlap
        bordered
        light
      >
        <v-btn :class="'rounded-c btn-custom mr-2 ' + className" v-show="this.token.role.authority === 'ROLE_ADMIN'" @click="campers">Campers</v-btn>
      </v-badge>
      <v-badge
        :v-show="notificationCaterers > 0"
        :content="notificationCaterers"
        :value="notificationCaterers"
        offset-x="25"
        offset-y="9"
        class="notification"
        color="#137547"
        overlap
        bordered
        light
      >
        <v-btn :class="'rounded-c btn-custom mr-2 ' + className" v-show="this.token.role.authority === 'ROLE_ADMIN'" @click="caterers">Caterers</v-btn>
      </v-badge>
      <template>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" :class="'rounded-c btn-custom ' + className">
                Menu
                <v-icon class="ml-2">mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <ChangePassword :className="className" />
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-show="this.token.role.authority === 'ROLE_CAMPER'">
                <SearchCampers />
              </v-list-item>
              <v-divider v-show="this.token.role.authority === 'ROLE_CAMPER'"></v-divider>
              <v-list-item v-show="this.token.role.authority === 'ROLE_ADMIN'">
                <router-link to="/statistic" class="custom-link">Statistic</router-link>
              </v-list-item>
              <v-divider v-show="this.token.role.authority === 'ROLE_ADMIN'"></v-divider>
              <v-list-item class="mt-2">
                <v-btn :class="'rounded-c btn-custom ' + className" @click="logout">Log out</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>
  </nav>
</template>

<script>
import ChangePassword from './ChangingPassword';
import SearchCampers from './SearchCampers';
import axios from 'axios';

export default {
  components: {
    ChangePassword,
    SearchCampers,
  },
  props: {
    color: String,
    className: String,
  },
  data() {
    return {
      token: JSON.parse(sessionStorage.getItem("token")),
      notification: 0,
      notificationCampers: 0,
      notificationCaterers: 0,
    };
  },
  created() {
    if (this.token.role.authority === 'ROLE_CATERER') {
      axios.get(`http://localhost:8080/reservation/pending/notification/caterer/${this.token.id}`).then((response) => {
        this.notification = response.data;
      })
    }

    if (this.token.role.authority === 'ROLE_ADMIN') {
      axios.get("http://localhost:8080/camper/notification").then((response) => {
        this.notificationCampers = response.data;
      })

      axios.get("http://localhost:8080/caterer/notification").then((response) => {
        this.notificationCaterers = response.data;
      })
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/signin");
    },
    reservations() {
      this.$router.push("/reservations");
    },
    search() {
      this.$router.push("/search");
    },
    campers() {
      this.$router.push("/campers");
    },
    caterers() {
      this.$router.push("/caterers");
    },
    createCampsite() {
      this.$router.push("/create");
    },
    profile() {
      this.$router.push(`/profile/${this.token.id}`);
      location.reload();
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.padding-c {
  padding-left: 60px !important;
  padding-right: 60px !important;
}

.logo {
  font-family: "Pacifico", cursive;
  font-size: 30px;
  padding: 10px;
}

.logo:hover {
  cursor: pointer;
}

.nav-custom {
  width: 100%;
}

.rounded-c {
  border-radius: 15px !important;
}

.btn-custom {
  width: 130px !important;
  height: 35px !important;
}

.white-btn {
  color: #137547;
  background-color: #fff !important;
}

.green-btn {
  color: #fff;
  background-color: #137547 !important;
}

.custom-link {
  text-decoration: none;
  color: #137547;
}
</style>