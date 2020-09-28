<template>
  <div>
    <Navigation color="#137547" className="white-btn" />
    <v-row class="margin-c">
      <div class="width-c div-c">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(image, i) in campsite.images" :key="i">
            <v-img height="100%" class="item-c" :src="image"></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>
      <v-card class="width-c card-c" height="400">
        <v-card-text>
          <v-col class="text-left">
            <v-row class="mb-4" align="center">
              <h1>{{campsite.name}}</h1>
              <v-icon class="ml-2" color="#FFD700">mdi-star</v-icon>
              <span class="ml-2">{{campsite.rating}}</span>
              <v-spacer></v-spacer>
              <v-menu open-on-hover>
                <div class="custom-bg d-flex align-center">
                  <v-row justify="center">
                    <b>Caterer info</b>
                  </v-row>
                </div>
                <template v-slot:activator="{ on, attrs }">
                  <a
                    href="#"
                    class="ml-2 custom-link"
                    v-bind="attrs"
                    v-on="on"
                  >{{campsite.catererDTO.name + ' ' + campsite.catererDTO.surname}}</a>
                </template>
                <v-card class="menu-custom">
                  <v-list>
                    <v-list-item>
                      <v-row align="center">
                        <b class="mr-2">Full name:</b>
                        {{campsite.catererDTO.name + ' ' + campsite.catererDTO.surname}}
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row align="center">
                        <b class="mr-2">Phone number:</b>
                        {{campsite.catererDTO.phoneNumber}}
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row align="center">
                        <b class="mr-2">Email:</b>
                        {{campsite.catererDTO.email}}
                      </v-row>
                    </v-list-item>
                    <v-list-item>
                      <v-row align="center">
                        <v-spacer></v-spacer>
                        <v-btn
                          color="#137547"
                          dense
                          class="rounded-c btn-custom"
                          dark
                          v-show="this.camperCanReport"
                          @click="report"
                        >Report</v-btn>
                      </v-row>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </v-row>
            <div class="divider mb-2"></div>
            <v-row>
              <p>
                <b>Description:</b>
                {{campsite.description}}
              </p>
            </v-row>
            <v-row>
              <p>
                <b>Nearest city:</b>
                {{campsite.nearestCity}}
              </p>
            </v-row>
            <v-row>
              <p>
                <b>Opening date:</b>
                {{`${campsite.openingDate[2]}-${campsite.openingDate[1]}-${campsite.openingDate[0]}`}}
              </p>
            </v-row>
            <v-row>
              <p>
                <b>Closing date:</b>
                {{`${campsite.closingDate[2]}-${campsite.closingDate[1]}-${campsite.closingDate[0]}`}}
              </p>
            </v-row>
            <v-row>
              <p>
                <b>Price:</b>
                {{campsite.pricePerDay + '€'}}
              </p>
              <v-spacer></v-spacer>
              <b class="ml-custom">Activities</b>
              <v-spacer></v-spacer>
            </v-row>
            <v-row class="d-flex align-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <img class="svg" v-bind="attrs" v-on="on" src="../assets/landscape.svg" />
                </template>
                <span>Close to mountain</span>
              </v-tooltip>
              <p v-show="campsite.closeToMountain">Yes</p>
              <p v-show="!campsite.closeToMountain">No</p>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <img class="svg" v-bind="attrs" v-on="on" src="../assets/river.svg" />
                </template>
                <span>Close to river</span>
              </v-tooltip>
              <p v-show="campsite.closeToRiver">Yes</p>
              <p v-show="!campsite.closeToRiver">No</p>
              <v-spacer></v-spacer>
              <v-row class="text-center">
                <div v-for="(a, i) in campsite.activities" :key="i">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-show="a === 'HIKING'"
                        v-bind="attrs"
                        v-on="on"
                        class="svg"
                        src="../assets/hiking.svg"
                      />
                    </template>
                    <span>Hiking</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-show="a === 'CLIMBING'"
                        v-bind="attrs"
                        v-on="on"
                        class="svg"
                        src="../assets/climbing.svg"
                      />
                    </template>
                    <span>Climbing</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-show="a === 'FISHING'"
                        v-bind="attrs"
                        v-on="on"
                        class="svg"
                        src="../assets/fishing.svg"
                      />
                    </template>
                    <span>Fishing</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-show="a === 'RAFTING'"
                        v-bind="attrs"
                        v-on="on"
                        class="svg"
                        src="../assets/rafting.svg"
                      />
                    </template>
                    <span>Rafting</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-show="a === 'BOATING'"
                        v-bind="attrs"
                        v-on="on"
                        class="svg"
                        src="../assets/boat.svg"
                      />
                    </template>
                    <span>Boating</span>
                  </v-tooltip>
                </div>
              </v-row>
            </v-row>
            <v-row class="mt-5" align="center">
              <v-rating
                v-model="rating"
                v-show="this.camperCanRate"
                dense
                color="#FFD700"
                background-color="#FFD700"
                half-increments
                @input="rate"
              ></v-rating>
              <v-spacer></v-spacer>
              <v-btn
                color="#137547"
                dense
                class="rounded-c btn-custom mr-2"
                dark
                v-show="token.role.authority == 'ROLE_CAMPER' && !isTopSpot"
                @click="reserve"
              >Reserve</v-btn>
              <v-btn
                color="#137547"
                width="100"
                dense
                class="rounded-c btn-custom"
                dark
                v-show="token.role.authority == 'ROLE_CAMPER'"
                @click="share"
              >Share</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="margin-c">
      <v-col class="reset text-center mt-3" cols="6" v-show="!this.camperCanComment && this.comments.length === 0">
        <h4 class="custom-link">There is no comments for this campsite</h4>
      </v-col>
      <v-col class="reset">
        <v-card class="card-c" v-show="this.camperCanComment" width="700">
          <ValidationObserver ref="obs">
          <v-col class="row-c">
            <ValidationProvider name="Comment" :rules="{required: true, regex: /^[a-zA-Z0-9.,?! ]*$/}">
            <v-textarea
              slot-scope="{
                  errors,
                  valid
                }"
              :error-messages="errors"
              :success="valid"
              class="mr-2 mt-2 rounded-c"
              outlined
              label="Comment"
              placeholder="Post some comment about this campsite"
              color="#137547"
              no-resize
              rows="3"
              v-model="commentContent"
              name="comment"
            ></v-textarea>
            </ValidationProvider>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                color="#137547"
                width="100"
                dense
                class="rounded-c mt-minus"
                dark
                @click="postComment"
              >Post</v-btn>
            </v-row>
          </v-col>
          </ValidationObserver>
        </v-card>
        <v-card class="card-c mt-3" width="700" v-for="comment in comments" :key="comment.id">
          <ValidationObserver ref="obs">
          <v-row class="row-c" align="center">
            <v-avatar size="38" color="#137547">
              <span class="white--text headline"><router-link class="custom-link-avatar" :to="`/profile/${comment.camperDTO.id}`">{{getInitials(comment.camperDTO.name + ' ' + comment.camperDTO.surname)}}</router-link></span>
            </v-avatar>
            <span class="ml-2"><router-link class="custom-link" :to="`/profile/${comment.camperDTO.id}`">{{comment.camperDTO.name + ' ' + comment.camperDTO.surname}}</router-link></span>
            <v-spacer></v-spacer>
            <span
              class="mr-3 comment-date"
            >{{`${comment.date[2]}-${comment.date[1]}-${comment.date[0]}`}}</span>
          </v-row>
          <v-row class="row-c">
            <p>{{comment.content}}</p>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              color="#137547"
              width="100"
              dense
              class="rounded-c mt-minus"
              dark
              v-if="token.role.authority === 'ROLE_ADMIN'"
              v-show="showBlockBtn"
              @click="block(comment)"
            >Block</v-btn>
          </v-row>
          <div v-show="comment.replyDTO || canPostReply(comment)" class="divider mt-2"></div>
          <v-col class="row-c" v-show="canPostReply(comment)">
            <ValidationProvider name="Reply" :rules="{required: true, regex: /^[a-zA-Z0-9.,?! ]*$/}">
            <v-textarea
              slot-scope="{
                  errors,
                  valid
                }"
              :error-messages="errors"
              :success="valid"
              class="mr-2 mt-2 rounded-c"
              outlined
              label="Reply"
              placeholder="Reply to comment about this campsite"
              color="#137547"
              no-resize
              rows="3"
              v-model="replyContent"
              name="reply"
            ></v-textarea>
            </ValidationProvider>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                color="#137547"
                width="100"
                dense
                class="rounded-c mt-minus"
                dark
                @click="postReply(comment)"
              >Post</v-btn>
            </v-row>
          </v-col>
          <div class="reply" v-show="comment.replyDTO">
            <v-row align="center">
              <img class="mr-2 ml-4 arrow" src="../assets/arrow.svg" width="20" height="20" />
              <v-avatar size="38" color="#137547">
                <span class="white--text headline">{{getInitials(getCatererName(comment))}}</span>
              </v-avatar>
              <span class="ml-2">{{getCatererName(comment)}}</span>
              <v-spacer></v-spacer>
              <span class="mr-5 comment-date">{{getReplyDate(comment)}}</span>
            </v-row>
            <v-row class="row-c reply mt-3">
              <p>{{getReplyContent(comment)}}</p>
            </v-row>
          </div>
          </ValidationObserver>
        </v-card>
      </v-col>
      <v-card class="width-c map-card">
        <google-map
          class="round-map"
          :center="{lat: campsite.latitude, lng: campsite.longitude}"
          :zoom="14"
        >
          <gmap-marker v-model="marker" :position="{lat: campsite.latitude, lng: campsite.longitude}"></gmap-marker>
        </google-map>
      </v-card>
    </v-row>
    <v-snackbar v-model="snackbar" :color="color" :right="true" :timeout="timeout" :top="true" text>
      {{text}}
      <template v-slot:action="{ attrs }">
        <v-icon :color="colorIcon" text v-bind="attrs" @click="snackbar = false">mdi-close</v-icon>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import axios from "axios";

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      campsite: {},
      rating: 0,
      token: JSON.parse(sessionStorage.getItem("token")),
      camperCanRate: null,
      camperCanComment: null,
      camperCanReport: null,
      comments: [],
      replyDTO: {},
      replyContent: "",
      caterer: {},
      commentContent: "",
      camperDTO: {},
      startDate: JSON.parse(localStorage.getItem("startDate")),
      endDate: JSON.parse(localStorage.getItem("endDate")),
      reservationDTO: {},
      marker: {},
      snackbar: false,
      timeout: 2500,
      color: "",
      colorIcon: "",
      text: "",
      isTopSpot: false,
      showBlockBtn: true,
    };
  },
  created() {
    this.getDetails();

    if (this.token.role.authority === "ROLE_CAMPER") {
      this.getCamper();
    }

    this.isTopSpot = (this.$route.query.topspot == 'true');

    if (this.token.role.authority === "ROLE_CAMPER") {
      axios.get(`http://localhost:8080/commenting/camper/${this.token.id}/campsite/${this.$route.params.id}`
        ).then((response) => {
          this.camperCanComment = response.data;
        });

      axios.get(`http://localhost:8080/rating/camper/${this.token.id}/campsite/${this.$route.params.id}`)
        .then((response) => {
          this.camperCanRate = response.data;
        });
    }

    this.getComments();
  },
  methods: {
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
    getDetails() {
      axios.get("http://localhost:8080/campsite/" + this.$route.params.id)
        .then((response) => {
          this.campsite = response.data;
        })
        .then(() => {
          if (this.token.role.authority === "ROLE_CAMPER") {
            axios.get(`http://localhost:8080/report/camper/${this.token.id}/caterer/${this.campsite.catererDTO.id}`
              ).then((response) => {
                this.camperCanReport = response.data;
              });
          }
        });
    },
    getInitials(string) {
      if (string !== "") {
        return string.match(/[A-Z]/g, "").join("");
      }
      return "";
    },
    getComments() {
      axios.get(`http://localhost:8080/comment/campsite/${this.$route.params.id}`).then((response) => {
          this.comments = response.data;
        });
    },
    getCatererName(comment) {
      if (comment.replyDTO != null) {
        return (comment.replyDTO.catererDTO.name + " " + comment.replyDTO.catererDTO.surname);
      }
      return "";
    },
    getReplyDate(comment) {
      if (comment.replyDTO != null) {
        return `${comment.replyDTO.date[2]}-${comment.replyDTO.date[1]}-${comment.replyDTO.date[0]}`;
      }
      return [];
    },
    getReplyContent(comment) {
      if (comment.replyDTO != null) {
        return comment.replyDTO.content;
      }
      return "";
    },
    postComment() {
      //this.$refs.obs.reset();
      axios.get("http://localhost:8080/camper/" + this.token.id).then((response) => {
          this.camperDTO = response.data;
          this.camperCanComment = false;
        }).then(() => {
          axios.post("http://localhost:8080/comment", {
              content: this.commentContent,
              camperDTO: this.camperDTO,
              campsiteDTO: this.campsite,
            }).then((response) => {
              this.commentDTO = response.data;
              this.snackbarSuccess();
              this.text = "Comment is successfully posted.";
              this.getComments();
            }).catch(() => {
              this.snackbarError();
              this.text = "Comment is not posted.";
              this.getComments();
            });
        });
    },
    canPostReply(comment) {
      if (this.campsite.catererDTO.id === this.token.id && comment.replyDTO === null) {
        return true;
      }
      return false;
    },
    postReply(comment) {
      //this.$refs.obs.reset();
      axios.post(`http://localhost:8080/reply/comment/${comment.id}`, {
          content: this.replyContent,
          catererDTO: this.campsite.catererDTO,
          campsiteDTO: this.campsite,
        }).then((response) => {
          this.replyDTO = response.data;
          this.snackbarSuccess();
          this.text = "Reply is successfully posted.";
          this.getComments();
        }).catch(() => {
          this.snackbarError();
          this.text = "Reply is not posted.";
          this.getComments();
        });
    },
    rate() {
      axios.put(`http://localhost:8080/campsite/camper/${this.token.id}/campsite/${this.campsite.id}/${this.rating}`
        ).then(() => {
          this.getDetails();
          axios.get(`http://localhost:8080/rating/camper/${this.token.id}/campsite/${this.$route.params.id}`
            ).then((response) => {
              this.camperCanRate = response.data;
              this.snackbarSuccess();
              this.text = "You successfully rate this campsite.";
            }).catch(() => {
              this.snackbarError();
              this.text = "The campsite is not rated.";
            });
        });
    },
    getCamper() {
      axios.get("http://localhost:8080/camper/" + this.token.id).then((response) => {
          this.camperDTO = response.data;
        });
    },
    block(comment) {
      axios.put("http://localhost:8080/camper/" + comment.camperDTO.id + "/block").then(() => {
          this.snackbarSuccess();
          this.showBlockBtn = false;
          this.text = "Camper is blocked.";
        }).catch(() => {
          this.snackbarError();
          this.text = "Camper is not blocked.";
        });
    },
    report() {
      axios.put(`http://localhost:8080/caterer/${this.campsite.catererDTO.id}/camper/${this.token.id}/report`).then(() => {
          this.snackbarSuccess();
          this.text = "Caterer is successfully reported.";
          this.getDetails();
        }).catch(() => {
          this.snackbarError();
          this.text = "Caterer is not reported.";
          this.getDetails();
        });
    },
    reserve() {
      axios.post("http://localhost:8080/reservation", {
          startDate: this.startDate,
          endDate: this.endDate,
          camperDTO: this.camperDTO,
          campsiteDTO: this.campsite,
        }).then((response) => {
          this.reservationDTO = response.data;
          this.snackbarSuccess();
          this.text = "Your reservation is successfully created.";
        }).catch(() => {
          this.snackbarError();
          this.text = "Your reservation is not created.";
        });
    },
    share() {
      axios.put(`http://localhost:8080/campsite/${this.campsite.id}/sharing/camper/${this.token.id}`).then(() => {
          this.snackbarSuccess();
          this.text = "Campsite is successfully shared.";
        }).catch(() => {
          this.snackbarError();
          this.text = "Campsite is already shared.";
        });
    },
  },
};
</script>

<style scoped>
.width-c {
  width: 700px !important;
}

.margin-c {
  margin: 15px;
}

.item-c {
  border-radius: 17px !important;
}

.clear {
  padding: 0;
  margin: 0;
}

.card-c {
  margin-left: 3.8%;
  border-radius: 17px;
}

.div-c {
  margin-left: 2.3%;
}

.svg {
  width: 40px;
  height: 40px;
  margin: 10px;
}

.row-c {
  padding: 10px;
  margin-left: 5px;
}

.divider {
  height: 1px;
  background-color: #f3f3f3;
}

.reply {
  padding-bottom: 0;
  padding-top: 10px;
  padding-left: 25px;
}

.arrow {
  transform: rotateX(3.142rad);
}

.comment-date {
  color: #9f9f9f;
  font-style: italic;
  font-size: 12px;
}

.right-align {
  margin-left: 400px !important;
}

.ml-custom {
  margin-left: 100px;
}

.custom-link {
  text-decoration: none;
  color: #137547;
}

.custom-link-avatar {
  text-decoration: none;
  color: #fff;
}

.rounded-c {
  border-radius: 15px !important;
}

.mt-minus {
  margin-top: -15px;
  margin-right: 20px;
}

.reset {
  margin: 0;
  padding: 0;
}

.menu-custom {
  padding: 20px;
  width: 300px;
}

.custom-bg {
  background-color: #137547;
  height: 50px;
  color: #fff;
}

.reply {
  margin-left: 10px;
}

.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
}

.map-card {
  padding: 5px;
  margin-right: 14px;
  height: 380px;
}
</style>