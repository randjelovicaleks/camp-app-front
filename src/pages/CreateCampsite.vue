<template>
  <div>
    <Navigation color="#137547" className="white-btn" />
    <v-container class="d-flex">
      <v-col>
        <v-row align="center" justify="center" class="mb-3">
          <h2 class="title-c">Create new campsite</h2>
        </v-row>
        <ValidationObserver ref="obs">
        <v-row>
          <v-col width="300px">
              <ValidationProvider name="Name" :rules="{required: true, alpha_spaces: true}">
                <v-text-field
                  slot-scope="{
                    errors,
                    valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  label="Name"
                  name="name"
                  color="#1bc274"
                  outlined
                  dense
                  v-model="name"
                  autocomplete="off"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Description" :rules="{required: true, regex: /^[a-zA-Z0-9.,?! ]*$/}">
              <v-textarea
                slot-scope="{
                  errors,
                  valid
                }"
                :error-messages="errors"
                :success="valid"
                label="Description"
                v-model="description"
                outlined
                rows="3"
                color="#1bc274"
                no-resize
                row-height="15"
                autocomplete="off"
              ></v-textarea>
              </ValidationProvider>
              <ValidationProvider name="Nearest city" :rules="{required: true, alpha_spaces: true}">
              <v-text-field
                slot-scope="{
                  errors,
                  valid
                }"
                :error-messages="errors"
                :success="valid"
                label="Nearest city"
                name="nearestcity"
                color="#1bc274"
                outlined
                dense
                v-model="nearestCity"
                autocomplete="off"
              ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Price" :rules="{required: true}">
                <v-text-field
                  slot-scope="{
                      errors,
                      valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  label="Price"
                  name="price"
                  color="#1bc274"
                  type="number"
                  outlined
                  dense
                  v-model="pricePerDay"
                  :min="0"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Number of tent spots" :rules="{required: true}">
                <v-text-field
                  slot-scope="{
                      errors,
                      valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  label="Number of tent spots"
                  name="price"
                  color="#1bc274"
                  type="number"
                  outlined
                  dense
                  v-model="tentSpotsNumber"
                  :min="0"
                ></v-text-field>
              </ValidationProvider>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
                color="#137547"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider name="Opening date" :rules="{required: true}">
                  <v-text-field
                    slot-scope="{
                      errors,
                      valid
                    }"
                    :error-messages="errors"
                    :success="valid"
                    v-model="openingDate"
                    label="Opening date"

                    readonly
                    color="#1bc274"
                    v-bind="attrs"
                    outlined
                    dense
                    v-on="on"
                  ></v-text-field>
                  </ValidationProvider>
                </template>
                <v-date-picker color="#137547" v-model="openingDate" scrollable :min="new Date().toISOString()">
                  <v-spacer></v-spacer>
                  <v-btn text color="#137547" @click="modal = false">Cancel</v-btn>
                  <v-btn text color="#137547" @click="$refs.dialog.save(openingDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
              <v-dialog
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="date"
                persistent
                width="290px"
                color="#137547"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider name="Closing date" :rules="{required: true}">
                  <v-text-field
                    slot-scope="{
                      errors,
                      valid
                    }"
                    :error-messages="errors"
                    :success="valid"
                    v-model="closingDate"
                    label="Closing date"

                    readonly
                    color="#1bc274"
                    v-bind="attrs"
                    outlined
                    dense
                    v-on="on"
                  ></v-text-field>
                  </ValidationProvider>
                </template>
                <v-date-picker color="#137547" v-model="closingDate" scrollable :min="new Date().toISOString()">
                  <v-spacer></v-spacer>
                  <v-btn text color="#137547" @click="modal2 = false">Cancel</v-btn>
                  <v-btn text color="#137547" @click="$refs.dialog2.save(closingDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
              <v-checkbox
                color="#137547"
                class="mt-custom"
                v-model="closeToMountain"
                label="Close to mountain"
              ></v-checkbox>
              <v-checkbox
                color="#137547"
                class="mt-custom"
                v-model="closeToRiver"
                label="Close to river"
              ></v-checkbox>
              <ValidationProvider name="Activities" :rules="{required: true}">
                <v-select
                  slot-scope="{
                    errors,
                    valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  outlined
                  color="#1bc274"
                  class="mr-2"
                  v-model="selectedActivities"
                  :items="activities"
                  label="Select activities"
                  multiple
                  item-color="#137547"
                  small-chips
                  dense
                  clearable
                  name="activities"
                ></v-select>
              </ValidationProvider>
            
          </v-col>
          <!---------------------------------------------------------------------------------------------->

          <v-col>
            <ValidationProvider name="Image" :rules="{required: true}">
            <v-file-input
              slot-scope="{
                errors,
                valid
              }"
              :error-messages="errors"
              :success="valid"
              accept="image/*"
              v-model="image"
              label="File input"
              outlined
              color="#1bc274"
              dense
              multiple
              small-chips
              clearable
              ref="imageField"
              @change="previewImage()"
            >
              <template v-slot:selection>
                <v-chip
                  class="file-info"
                  small
                  label
                  color="#137547"
                >
                  {{ filesText }}
                </v-chip>
              </template>
            </v-file-input>
            </ValidationProvider>
            <v-layout class="placeholder" row wrap justify-center v-if="images.length > 0" :key="rerenderKey">
              <v-card class="reset" v-for="(img, i) in images" :key="i">
                <v-img :src="img" width="150" height="100%">
                  <v-icon @click="removeImage(i)" color="error">close</v-icon>
                </v-img>
              </v-card>
            </v-layout>
            <v-row>
              <div class="map">
                <google-map :center="{lat: coordinates.lat, lng: coordinates.lng }" :zoom="14">
                  <gmap-marker
                    v-model="marker"
                    :draggable="true"
                    :position="{ lat: coordinates.lat, lng: coordinates.lng }"
                    @dragend="getMarkerPosition($event.latLng)"
                  ></gmap-marker>
                </google-map>
              </div>
            </v-row>
            <ValidationProvider name="Location" :rules="{required: true}">
                <v-text-field
                  slot-scope="{
                      errors,
                      valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  label="Location"
                  name="location"
                  color="#1bc274"
                  class="ml-2 mt-6"
                  type="text"
                  outlined
                  dense
                  v-model="locationText"
                  disabled
                ></v-text-field>
              </ValidationProvider>
          </v-col>
        </v-row>
        </ValidationObserver>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn color="#137547" class="rounded-c btn-custom" dark @click="createCampsite">Create</v-btn>
        </v-row>
      </v-col>
    </v-container>
    <v-snackbar
      v-model="snackbarInfo"
      color="#137547"
      :right="true"
      :timeout="-1"
      :top="true"
      text
      class="mt-5"
    >
      <v-icon color="#137547" class="mr-3">mdi-information-outline</v-icon>To select location of campsite move red marker on map. Marker is placed on your current location if you pressed allow in top left corner.
      <template
        v-slot:action="{ attrs }"
      >
        <v-icon text v-bind="attrs" color="#137547" @click="snackbarInfo = false">mdi-close</v-icon>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar" :color="color" :right="true" :timeout="timeout" :top="true" text>
      {{text}}
      <template v-slot:action="{ attrs }">
        <v-icon :color="colorIcon" text v-bind="attrs" @click="snackbar = false">mdi-close</v-icon>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "../components/Navigation";

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      image: [],
      images: [],
      modal: false,
      modal2: false,
      nearestCity: "",
      pricePerDay: "",
      openingDate: null,
      closingDate: null,
      name: "",
      closeToMountain: false,
      closeToRiver: false,
      activities: [
        { value: "HIKING", text: "Hiking" },
        { value: "CLIMBING", text: "Climbing" },
        { value: "FISHING", text: "Fishing" },
        { value: "RAFTING", text: "Rafting" },
        { value: "BOATING", text: "Boating" },
      ],
      selectedActivities: [],
      description: "",
      tentSpotsNumber: "",
      longitude: 0,
      latitude: 0,
      token: JSON.parse(sessionStorage.getItem("token")),
      campsiteDTO: {},
      catererDTO: {},
      coordinates: { lat: 10, lng: 10 },
      snackbar: false,
      timeout: 2500,
      color: "",
      colorIcon: "",
      text: "",
      snackbarInfo: true,
      rerenderKey: 1,
      locationText: '',
      filesText: ''
    };
  },
  created() {
    axios.get(`http://localhost:8080/caterer/${this.token.id}`).then((response) => {
        this.catererDTO = response.data;
      });
  },
  mounted() {
    this.$getLocation().then((coordinates) => {
      this.coordinates = coordinates;
    });
  },
  methods: {
    getMarkerPosition(newPosition) {
      this.latitude = newPosition.lat();
      this.longitude = newPosition.lng();
      this.locationText = `Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
    },
    previewImage() {
      const reader = new FileReader();

      reader.addEventListener("load",() => {
          this.images.push(reader.result);
          this.filesText = `${this.images.length} files selected`;
        },
        false
      );

      reader.readAsDataURL(this.image[0]);
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.rerenderKey += 1;
      this.filesText = `${this.images.length} files selected`;
      if(this.images.length === 0) {
        this.$refs.imageField.clearableCallback();
      }
    },
    createCampsite() {
      this.$refs.obs.validate();

      if(this.name && this.description && this.nearestCity && this.closingDate && this.openingDate 
        && this.tentSpotsNumber && this.pricePerDay && this.selectedActivities && this.images) {
        
        axios.post("http://localhost:8080/campsite", {
            name: this.name,
            description: this.description,
            nearestCity: this.nearestCity,
            closeToMountain: this.closeToMountain,
            closeToRiver: this.closeToRiver,
            openingDate: this.openingDate,
            closingDate: this.closingDate,
            tentSpotsNumber: this.tentSpotsNumber,
            longitude: this.longitude,
            latitude: this.latitude,
            pricePerDay: this.pricePerDay,
            catererDTO: this.catererDTO,
            activities: this.selectedActivities,
            images: this.images,
          }).then((response) => {
            this.campsiteDTO = response.data;
            this.snackbar = true;
            this.color = "#137547";
            this.colorIcon = "#137547";
            this.text = "The campsite is successfully created.";
            this.clear();
          }).catch(() => {
            this.snackbar = true;
            this.color = "red";
            this.colorIcon = "red";
            this.text = "The campsite is not created.";
          });
      }
    },
    clear() {
      this.$refs.obs.reset();

      this.name = null;
      this.description = null;
      this.nearestCity = null;
      this.openingDate = null;
      this.closingDate = null;
      this.pricePerDay = null;
      this.tentSpotsNumber = null;
      this.closeToMountain = false;
      this.closeToRiver = false;
      this.selectedActivities = [];
      this.images = [];
      this.image = null;
    },
  },
};
</script>

<style scoped>
.max-width {
  width: 60%;
}

.mt-custom {
  margin-top: -5px;
}

.title-c {
  font-family: "Pacifico", cursive !important;
  color: #137547;
  font-size: 30px;
}

.reset {
  padding: 0 !important;
  margin: 20px;
  max-height: 150px;
}

.placeholder {
  height: 420px;
}

.map {
  width: 600px;
  height: 300px;
  margin-left: 20px;
}

.rounded-c {
  border-radius: 15px !important;
}

.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
}

.file-info {
  color: #fff;
  background-color: #137547;
}
</style>