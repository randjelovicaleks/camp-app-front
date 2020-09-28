<template>
  <v-card class="elevation-12 text-center d-flex justify-center" width="1010">
    <v-card-text class="d-flex justify-center">
      <v-col>
        <v-form>
          <ValidationObserver ref="obs">
          <v-row class="pt-3">
            <ValidationProvider name="Closest city" :rules="{required: true, alpha_spaces: true}">
            <v-text-field
              slot-scope="{
                  errors,
                  valid
                }"
              :error-messages="errors"
              :success="valid"
              label="Closest city"
              class="rounded-c mr-2"
              name="closestcity"
              type="text"
              color="#1bc274"
              outlined
              dense
              dark
              v-model="closestcity"
              autocomplete="off"
            ></v-text-field>
            </ValidationProvider>
            <v-dialog
              ref="dialog"
              v-model="modal"
              color="#137547"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <ValidationProvider name="Date from" :rules="{required: true}">
                <v-text-field
                  slot-scope="{
                    errors,
                    valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  v-model="dateFrom"
                  label="Date from"
                  class="rounded-c mr-2"
                  readonly
                  color="#1bc274"
                  v-bind="attrs"
                  outlined
                  dense
                  dark
                  v-on="on"
                ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker color="#137547" v-model="dateFrom" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="#137547" @click="modal = false">Cancel</v-btn>
                <v-btn text color="#137547" @click="$refs.dialog.save(dateFrom)">OK</v-btn>
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
                <ValidationProvider name="Date to" :rules="{required: true}">
                <v-text-field
                  slot-scope="{
                    errors,
                    valid
                  }"
                  :error-messages="errors"
                  :success="valid"
                  v-model="dateTo"
                  label="Date to"
                  class="rounded-c mr-2"
                  readonly
                  color="#1bc274"
                  v-bind="attrs"
                  outlined
                  dense
                  dark
                  v-on="on"
                ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker color="#137547" v-model="dateTo" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="#137547" @click="modal2 = false">Cancel</v-btn>
                <v-btn text color="#137547" @click="$refs.dialog2.save(dateTo)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-btn color="#137547" class="rounded-c btn-custom" dark @click="search">
              <v-icon left>search</v-icon>Search
            </v-btn>
            <v-btn color="#137547" class="rounded-c btn-custom ml-2" dark @click="expand = !expand">
              <v-icon left>mdi-arrow-down</v-icon>Expand
            </v-btn>
          </v-row>
          </ValidationObserver>
        </v-form>
        <v-slide-y-transition>
          <v-row v-show="expand" class="mt-3">
            <v-text-field
              label="Price from"
              class="rounded-c mr-2"
              name="pricefrom"
              type="number"
              color="#1bc274"
              outlined
              dense
              dark
              v-model="priceFrom"
              autocomplete="off"
              min=0
            ></v-text-field>

            <v-text-field
              label="Price to"
              class="rounded-c mr-2"
              name="priceto"
              type="number"
              color="#1bc274"
              outlined
              dense
              dark
              v-model="priceTo"
              autocomplete="off"
              min=0
            ></v-text-field>

            <v-select
              outlined
              dark
              color="#1bc274"
              class="rounded-c mr-2 max-width"
              v-model="selectedActivities"
              :items="activities"
              label="Select activities"
              multiple
              item-color="#137547"
              dense
            >
              <template v-slot:selection="{ index }">
                <v-chip v-if="index === 0" small color="#137547">
                  <span>{{ selectedActivities.length }} selected</span>
                </v-chip>
              </template>
            </v-select>

            <v-checkbox
              dark
              color="#137547"
              v-model="closeToMountain"
              class="mr-2 my-auto"
              label="Close to mountain"
            ></v-checkbox>
            <v-checkbox
              dark
              color="#137547"
              v-model="closeToRiver"
              class="my-auto"
              label="Close to river"
            ></v-checkbox>
          </v-row>
        </v-slide-y-transition>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      modal2: false,
      dateFrom: null,
      dateTo: null,
      expand: false,
      priceFrom: 0,
      priceTo: 0,
      closestcity: "",
      closeToMountain: false,
      closeToRiver: false,
      selectedActivities: [],
      activities: [
        { value: "HIKING", text: "Hiking" },
        { value: "CLIMBING", text: "Climbing" },
        { value: "FISHING", text: "Fishing" },
        { value: "RAFTING", text: "Rafting" },
        { value: "BOATING", text: "Boating" },
      ],
    };
  },
  methods: {
    search() {

      localStorage.setItem("startDate", JSON.stringify(this.dateFrom));
      localStorage.setItem("endDate", JSON.stringify(this.dateTo));

      if(!this.dateFrom && !this.dateTo && !this.closestcity) {
        this.$refs.obs.validate();
        return;
      } else if(!this.dateFrom && !this.dateTo) {
        this.$refs.obs.validate();
        return;
      }

      if (this.dateFrom != null && this.dateTo != null && this.closestcity != '' && this.priceFrom === 0 && this.priceTo === 0
          && this.closeToMountain === false && this.closeToRiver === false && this.selectedActivities.length === 0) {
            this.$refs.obs.validate();
            axios.get(`http://localhost:8080/campsite/${this.dateFrom}/${this.dateTo}/${this.closestcity}`).then((response) => {
              this.$emit('clicked', {data: response.data, searched: true});
            })
          } else {
            if (this.selectedActivities.length === 0) {
              axios.get(`http://localhost:8080/campsite/search/${this.dateFrom}/${this.dateTo}/${this.closestcity}/${this.closeToMountain}/${this.closeToRiver}/${this.priceFrom}/${this.priceTo}`).then((response) => {
                this.$emit('clicked', {data: response.data, searched: true});
              });
            } else {
              axios.get(`http://localhost:8080/campsite/search/${this.dateFrom}/${this.dateTo}/${this.closestcity}/${this.closeToMountain}/${this.closeToRiver}/${this.priceFrom}/${this.priceTo}/${this.selectedActivities}`).then((response) => {
                this.$emit('clicked', {data: response.data, searched: true});
              });
            }
          }
    }
  }
};
</script>

<style scoped>
.rounded-c {
  border-radius: 15px !important;
}

.width-c {
  width: 300px !important;
}

.max-width {
  max-width: 230px !important;
}
</style>