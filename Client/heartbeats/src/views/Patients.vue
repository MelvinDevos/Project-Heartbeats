<template>
  <div class="Dashboard" fill-height>
    <Navbar />

    <v-container class="px-15" fluid>
      <v-row align="center" class="pt-4">
        <v-col class="pl-0" sm="2">
          <v-select
            @change="sort()"
            v-model="sortBy"
            :items="items"
            menu-props="auto"
            label="Sorteren op:"
            hide-details
            single-line
            dense
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <Addpatient />
      </v-row>
      <v-row class="py-4">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="patient in getPatients"
            :key="patient.id"
            class="my-0"
          >
            <v-expansion-panel-header>
              <Patientcard
                :Id="patient.id"
                :Name="patient.name"
                :Dementia="patient.type_dementia"
              />
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container fluid class="pa-0 ma-0">
                <v-row class="pa-0 ma-0">
                  <v-col md11 class="pa-0 ma-0 pl-5">
                    <div>
                      <div class="caption grey--text">Box-ID:</div>
                      <div>{{ patient.box_id }}</div>
                    </div>

                    <div>
                      <div class="caption grey--text">Basis Hartslag:</div>
                      <div>{{ patient.hr_tresh }}</div>
                    </div>
                  </v-col>
                  <v-col md1 lg="1" class="pa-0 ma-0 mx-0 text-right">
                    <Updatepatient :Patient="patient" />
                    <v-btn
                      @click="deletePatient(patient.id)"
                      small
                      fab
                      dark
                      color="red lighten-1"
                      class="mx-1 mt-2"
                    >
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Patientcard from "@/components/Patientcard.vue";
import Updatepatient from "@/components/Updatepatient.vue";
import Addpatient from "@/components/Addpatient.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Patientcard,
    Updatepatient,
    Addpatient,
  },
  data() {
    return {
      items: [{ text: "id" }, { text: "name" }],
      sortBy: "",
    };
  },
  computed: {
    ...mapGetters(["getPatients"]),
  },
  methods: {
    ...mapActions(["fetchPatients", "deletePatient", "sortAction"]),
    sort: function () {
      this.sortAction(this.sortBy);
      console.log(this.sortBy);
    },
  },
  created: function () {
    console.log("I am created");
    this.fetchPatients();
  },
};
</script>
