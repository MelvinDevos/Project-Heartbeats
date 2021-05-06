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
        <!-- <Addpatient /> -->
      </v-row>
      <v-row class="py-4">

          <v-expansion-panels>
            <v-expansion-panel
              v-for="patient in getPatients"
              :key="patient.id"
              class="my-0"
            >
              <v-expansion-panel-header>
                <Playlistcard
                  :Name="patient.name"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                 <Musicselector :Id="patient.id" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Playlistcard from "@/components/Playlistcard.vue";
import Musicselector from '@/components/Musicselector.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Playlistcard,
    Musicselector, 
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
    ...mapActions(["fetchPatients", "sortAction"]),
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
