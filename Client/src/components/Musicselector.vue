<template>
  <div>
    <!-- {{ getToken }} -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getSongs"
      :search="search"
      sort-by="calories"
      class="elevation-0"
      show-select
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn @click="updatePlaylist()" icon color="primary">
              <v-icon>save</v-icon>
            </v-btn>
          </v-card-title>
        </v-toolbar>
        <!-- {{ selected }} -->
      </template>
    </v-data-table>
    
  </div>
</template>

<script>
const axios = require("axios");
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["Id"],
  components: {},
  data() {
    return {
      search: "",
      dialog: false,
      selected: [],
      headers: [
        {
          text: "Naam liedje",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Duratie", value: "duration" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getSongs", "getList", "getToken"]),
    numberOfPages() {
      return Math.ceil(this.getSongs.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  methods: {
    ...mapActions(["fetchSongs", "updatePlaylist"]),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    initialize() {
      console.log("initialise");
      console.log(this.getToken);
      console.log(this.getSongs);
    },
    async updatePlaylist() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.getToken,
      };

      try {
        const response = await axios.put(
          `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/playlist/update/${this.Id}`,
          this.selected,
          {
            headers: headers,
          }
        );
        console.log("Upgedate");
        console.log(response);
      } catch (error) {
        console.log("wel error");
        console.log(error);
      }
    },
  },
  created: async function () {
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.getToken,
    };

    try {
      const response = await axios.get(
        `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/playlist/show/${this.Id}`,
        { headers: headers }
      );
      console.log("geen error");
      let test = [{ id: 2 }, { id: 4 }, { id: 6 }];
      console.log(test);
      //     this.selected = test
      console.log(response.data);
      this.selected = response.data;
      // response.data;
      //[ { "id": 2 }, { "id": 4 }, { "id": 6 } ]
      //{ "song_id": 1, "name": "We are number one, Remix", "yt_link": "qol5HvBR8jc", "duration": "5:03" }
    } catch (error) {
      console.log("wel error");
      console.log(error);
    }

    console.log("created ehhj");
    console.log(this.getToken);
    this.fetchSongs().then(() => {
      this.initialize();
    });
  },
};
</script>

<style scoped>
</style>