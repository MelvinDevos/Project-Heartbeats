<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small fab dark color="green lighten-1" v-bind="attrs" v-on="on">
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Patiënt toevoegen</v-card-title>
      <v-card-subtitle class="pb-0"
        >Vul onderstaande informatie in:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="addPatient(patient)">
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
            <v-btn
              class="green lighten-1 mb-2"
              @click="dialog = false"
              rounded
              type="submit"
              ><span class="font-weight-bold">Toevoegen</span>
              <v-icon right>add</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    {{ patient }}
  </v-dialog>
</template>

<script>
import Speakerselector from "@/components/Speakerselector.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Speakerselector,
  },
  data() {
    return {
      speakers: [],
      patient: {
        name: "",
        age: 0,
        type_dementia: "",
        hr_tresh: 0,
        box_id: "",
      },
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["addPatient"]),
    equalise: function (selected) {
      this.patient.box_id = selected;
    },
    retrieveId: function () {},
  },
};
</script>