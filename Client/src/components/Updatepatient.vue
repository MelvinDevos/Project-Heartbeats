<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        fab
        dark
        color="blue lighten-1"
        class="mx-1 mt-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Patiënt updaten</v-card-title>
      <v-card-subtitle class="pb-0"
        >Bewerk onderstaande informatie:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="updatePatient(patient)">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Naam"
                v-model="patient.name"
                prepend-icon="person"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Leeftijd"
                v-model="patient.age"
                prepend-icon="cake"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <Speakerselector />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Type Dementie"
                v-model="patient.type_dementia"
                prepend-icon="accessibility_new"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md3>
              <v-text-field
                label="Basis hartslag"
                v-model="patient.hr_tresh"
                prepend-icon="favorite"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="space-around">
            <div>
              <v-checkbox
                v-model="patient.custom"
                :label="`Custom playlist`"
              ></v-checkbox>
              <v-btn
                class="blue lighten-1 mb-2"
                @click="dialog = false"
                rounded
                type="submit"
                ><span class="font-weight-bold">Update</span>
                <v-icon right>update</v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    {{ patient }}
  </v-dialog>
</template>

<script>
import Speakerselector from "@/components/Speakerselector.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Speakerselector,
  },
  data() {
    return {
      speakers: [],
      patient: {
        id: this.Patient.id,
        name: this.Patient.name,
        age: this.Patient.age,
        type_dementia: this.Patient.type_dementia,
        hr_tresh: this.Patient.hr_tresh,
        box_id: this.getSelectedSpeaker,
        custom: this.Patient.custom,
      },
      dialog: false,
    };
  },
  props: ["Patient"],

  computed: {
    ...mapGetters(["getSelectedSpeaker"]),
  },

  methods: {
    ...mapActions(["updatePatient"]),
  },
};
</script>
