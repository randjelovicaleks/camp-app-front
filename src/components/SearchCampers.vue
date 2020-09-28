<template>
  <v-row class="ml-1">
    <v-dialog v-model="dialog" max-width="460px">
      <template v-slot:activator="{ on, attrs }">
        <a href="#" class="custom-link" v-bind="attrs" v-on="on">Find campers</a>
      </template>
      <v-card>
        <div class="custom-bg d-flex align-center">
          <v-row justify="center">
            <h3>Find campers</h3>
          </v-row>
        </div>
        <v-card-text>
            <v-container>
              <ValidationObserver ref="obs">
              <v-row class="mt-4" justify="center">
                <ValidationProvider name="Full name" :rules="{required: true}">
                  <v-text-field
                    slot-scope="{
                          errors,
                          valid
                        }"
                    :error-messages="errors"
                    :success="valid"
                    label="Full name"
                    class="rounded-c width-c"
                    name="fullName"
                    type="text"
                    color="#137547"
                    outlined
                    dense
                    v-model="fullName"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
                <v-btn class="ml-2 btn-custom green-btn rounded-c" @click="searchCampers">Search</v-btn>
              </v-row>
              </ValidationObserver>
              <v-row v-show="emptySearch" justify="center"><h3>No search results</h3></v-row>
              <v-row v-for="camper in campers" :key="camper.id" class="reset ma-3 col-clickable" @click="goToProfile(camper.id)" align="center">
                <v-avatar size="35" class="mr-2" color="#137547">
                  <span class="white--text headline">{{getInitials(`${camper.name} ${camper.surname}`)}}</span>
                </v-avatar>
                <p class="mt-3">{{camper.name}} {{camper.surname}}</p>
              </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      emptySearch: false,
      fullName: '',
      campers: [],
    }
  },
  methods: {
    searchCampers() {
      let [name, surname] = ['', 'null']
      if (this.fullName.includes(' ')) {
        [name, surname] = this.fullName.split(' ');
      } else {
        name = this.fullName;
      }

      axios.get(`http://localhost:8080/camper/${name}/${surname}`).then((response) => {
        this.campers = response.data;
        if(this.campers.length === 0) {
          this.emptySearch = true;
        } else {
          this.emptySearch = false;
        }
      });
    },
    getInitials(string) {
      if (string !== "") {
        return string.match(/[A-Z]/g, "").join("");
      }
      return "";
    },
    goToProfile(id) {
      this.$router.push(`/profile/${id}`);
      location.reload();
    }
  }
}
</script>

<style scoped>
.rounded-c {
  border-radius: 15px !important;
}

.width-c {
  width: 300px !important;
}

.custom-bg {
  background-color: #137547;
  height: 60px;
  color: #fff;
}

.btn-custom {
  height: 40px !important;
  width: 100px;
}

.white-btn {
  color: #137547;
  background-color: #fff !important;
}

.green-btn {
  color: #fff;
  background-color: #137547 !important;
}

.rounded-c {
  border-radius: 15px !important;
}

.custom-link {
  text-decoration: none;
  color: #137547;
}

.col-clickable {
  cursor: pointer;
}
</style>