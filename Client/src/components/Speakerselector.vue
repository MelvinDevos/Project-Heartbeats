<template>
  <v-container fluid>
    <v-row align="center">
      <v-select
        @change="equalise"
        ref="speaker"
        prepend-icon="speaker"
        v-model="patient.box_id"
        :items="getSpeakers"
        item-text="text"
        item-value="id"
        label="Box-ID"
        placeholder="Select..."
      ></v-select>

      <v-btn @click="fetchSpeakers" icon color="indigo">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      speakers: [],
      patient: {
        name: "",
        type_dementia: "",
        hr_tresh: 0,
        box_id: "",
      },
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(["getSpeakers"]),
  },
  methods: {
    ...mapActions(["fetchSpeakers", "setSelectedSpeaker"]),
    equalise: function (selected) {
      console.log(selected)
      this.setSelectedSpeaker(selected)

    },
  },
  created: function () {
    console.log("I am speakers dingk");
    this.fetchSpeakers()
  },
};
</script>