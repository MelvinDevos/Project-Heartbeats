<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small fab dark color="green lighten-1" v-bind="attrs" v-on="on">
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Liedje toevoegen</v-card-title>
      <v-card-subtitle class="pb-0"
        >Vul onderstaande informatie in:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="addSong(song)">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Naam liedje"
                v-model="song.name"
                prepend-icon="music_note"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Youtube Link"
                placeholder="bv: ErHFQ3r9K2Y"
                v-model="song.yt_link"
                prepend-icon="link"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md3>
              <v-text-field
                label="Duratie"
                placeholder="bv: 3:13"
                v-model="song.duration"
                prepend-icon="timer"
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
    {{ song }}
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      speakers: [],
      song: {
        name: "",
        yt_link: "",
        duration: "",
      },
      dialog: false,
    };
  },
  components: {},
  methods: {
    ...mapActions(["addSong"]),
    equalise: function (selected) {
      this.patient.box_id = selected;
    },
    retrieveId: function () {},
  },
};
</script>