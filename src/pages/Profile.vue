<template>
  <div>
    <Navigation color="#137547" className="white-btn"/>
    <v-container>
      <v-row class="reset">
        <v-col cols="6">
          <v-card class="card">
            <v-row class="reset" align="center">
              <v-avatar size="45" class="mr-3" color="#137547">
                <span class="white--text headline">{{getInitials(`${camper.name} ${camper.surname}`)}}</span>
              </v-avatar>
              <h2>{{camper.name}} {{camper.surname}}</h2>
              <v-spacer></v-spacer>
              <span v-show="!isFollowing"><v-btn v-show="!campersProfile" @click="follow" outlined color="#137547">Follow</v-btn></span>
              <span v-show="isFollowing"><v-btn v-show="!campersProfile" disabled outlined color="#137547">Following</v-btn></span>
            </v-row>
            <v-row class="reset mt-2">
              <p>{{camper.email}}</p>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pt-4 pb-4">
            <v-row class="reset">
              <v-col class="col-clickable" justify="center" align="center" @click="openDialogFollowers"><p class="text">Followers</p></v-col>
              <v-col class="col-clickable" justify="center" align="center" @click="openDialogFollowing"><p class="text">Following</p></v-col>
              <v-col justify="center" align="center"><p class="text">Shared sites</p></v-col>
            </v-row>
            <v-row class="reset">
              <v-col class="col-clickable" justify="center" align="center" @click="openDialogFollowers">{{followers.length}}</v-col>
              <v-divider vertical></v-divider>
              <v-col class="col-clickable" justify="center" align="center" @click="openDialogFollowing">{{following.length}}</v-col>
              <v-divider vertical></v-divider>
              <v-col justify="center" align="center">{{sharedCampsites.length}}</v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="reset pa-5" v-show="campersProfile && camper.favouriteCampsites.length > 0">
        <v-col class="reset text-center" align="center" justify="center">
          <h2 class="text">Favourite campsites</h2>
          <v-row>
            <div v-for="campsite in camper.favouriteCampsites" :key="campsite.id" class="mt-5">
              <v-col class="ml-13">
                <ProfileCard class="ml-custom" :campsite="campsite" :isFavourite="true" @clicked="removeClicked" />
              </v-col>
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="reset pa-5" v-show="sharedCampsites.length > 0">
        <v-col class="reset text-center" align="center" justify="center">
          <h2 class="text">Shared campsites</h2>
          <v-row>
            <div v-for="campsite in sharedCampsites" :key="campsite.id" class="mt-5">
              <v-col class="ml-13">
                <ProfileCard :campsite="campsite" :isFavourite="false" @clicked="removeClicked" />
              </v-col>
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="reset pa-5" v-show="sharedCampsites.length === 0 && !campersProfile && isFollowing" align="center" justify="center">
        <h3 class="mb-5 lock-text">There is no shared sites for this camper</h3>
      </v-row>
      <v-row class="reset pa-5" v-show="!isFollowing && !campersProfile" align="center" justify="center">
        <div align="center" justify="center" class="c-container">
          <h3 class="mb-5 lock-text">This account is locked please follow this camper to see his shared sites</h3>
          <v-img src="../assets/locked.svg" class="image"></v-img>
        </div>
      </v-row>

      <v-dialog
        v-model="dialogFolowers"
        max-width="290"
      >
      <v-card>
        <v-card-title class="headline text">
          <v-row class="reset" align="center" justify="center">
            Followers
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row v-for="follower in followers" :key="follower.id" class="reset ma-3 col-clickable" @click="goToProfile(follower.id)" align="center">
            <v-avatar size="35" class="mr-2" color="#137547">
              <span class="white--text headline">{{getInitials(`${follower.name} ${follower.surname}`)}}</span>
            </v-avatar>
            <p class="mt-3">{{follower.name}} {{follower.surname}}</p>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#137547"
            text
            @click="dialogFolowers = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialogFolowing"
        max-width="290"
      >
      <v-card>
        <v-card-title class="headline text">
          <v-row class="reset" align="center" justify="center">
            Following
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row v-for="follower in following" :key="follower.id" class="reset ma-3 col-clickable" @click="goToProfile(follower.id)" align="center">
            <v-avatar size="35" class="mr-2" color="#137547">
              <span class="white--text headline">{{getInitials(`${follower.name} ${follower.surname}`)}}</span>
            </v-avatar>
            <p class="mt-3">{{follower.name}} {{follower.surname}}</p>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#137547"
            text
            @click="dialogFolowing = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import ProfileCard from '../components/ProfileCard';
import axios from 'axios';

export default {
  components: {
    Navigation,
    ProfileCard
  },
  data() {
    return {
      camper: {},
      campersProfile: false,
      isFollowing: false,
      dialogFolowers: false,
      dialogFolowing: false,
      token: JSON.parse(sessionStorage.getItem("token")),
      id: this.$route.params.id,
      followers: [],
      following: [],
      sharedCampsites: [],
    }
  },
  created() {
    if(this.token.id == this.id) {
      this.campersProfile = true;
    }
    this.getData();
  },
  methods: {
    getData() {
      axios.get(`http://localhost:8080/camper/${this.id}`).then((response) => {
        this.camper = response.data;
      });

      axios.get(`http://localhost:8080/campsite/shared/camper/${this.id}`).then((response) => {
        this.sharedCampsites = response.data;
      })

      axios.get(`http://localhost:8080/camper/${this.id}/followers`).then((response) => {
        this.followers = response.data;
      });

      axios.get(`http://localhost:8080/camper/${this.id}/following`).then((response) => {
        this.following = response.data;
      });

      if(this.token.id != this.id) {
        axios.get(`http://localhost:8080/following/${this.token.id}/${this.id}`).then((response) => {
          this.isFollowing = response.data;
        });
      }
    },
    getInitials(string) {
      if (string !== "") {
        return string.match(/[A-Z]/g, "").join("");
      }
      return "";
    },
    follow() {
      axios.post(`http://localhost:8080/following/${this.token.id}/${this.id}`).then(() => {
        this.getData();
      });
    },
    goToProfile(id) {
      this.dialogFolowers = false;
      this.dialogFolowing = false;
      this.$router.push(`/profile/${id}`);
      location.reload();
    },
    openDialogFollowers() {
      if (this.followers.length != 0) {
        this.dialogFolowers = true;
      }
    },
    openDialogFollowing() {
      if (this.following.length != 0) {
        this.dialogFolowing = true;
      }
    },
    removeClicked() {
      this.getData();
    }
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.card {
  padding: 25px;
}

.reset {
  padding: 0;
  margin: 0;
}

.text {
  color: #137547;
  font-family: "Pacifico", cursive !important;
}

.image {
  width: 150px;
}

.lock-text {
  color: #13754780;
}

.c-container {
  margin-top: 10%;
}

.col-clickable {
  cursor: pointer;
}
</style>