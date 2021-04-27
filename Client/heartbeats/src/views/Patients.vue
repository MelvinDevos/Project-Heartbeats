<template>
  <div class="Dashboard" fill-height>
    <Navbar />

    <v-expansion-panels class="pa-8">
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
                <!-- <updateUserPopup :User="user" /> -->
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
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Patientcard from "@/components/Patientcard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Navbar, Patientcard },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getPatients"]),
  },
  methods: {
    ...mapActions(["fetchPatients", "deletePatient"]),
  },
  created: function () {
    console.log("I am created");
    this.fetchPatients();
  },
};
</script>
