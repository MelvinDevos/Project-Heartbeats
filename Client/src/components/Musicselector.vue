<template>
  <div>
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
              <v-btn @click="updatePlaylist({playlist:selected,id:Id})" icon color="indigo">
                <v-icon>save</v-icon>
              </v-btn>
            </v-card-title>
          </v-toolbar>
          {{selected}}
        </template>
      </v-data-table>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
// const axios = require("axios");
export default {
  props: ["Id"],
  components: {  },
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
    ...mapGetters(["getSongs","getList"]),
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
    ...mapActions(["fetchSongs","updatePlaylist","fetchList"]),
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
      console.log(this.getSongs);
    },
  },
  created: function () {
            let test=[{ "id": 2}, { "id": 4}, { "id": 6}]
        this.selected = test
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: process.env.VUE_APP_JWT_TOKEN_SECRET,
    // };
    // axios
    //   .get(`http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/Playlist/show/${this.Id}`, { headers: headers })
    //   .then(function (response) {
    //     console.log(response);
    //     let test=[{ "id": 2}, { "id": 4}, { "id": 6}]
    //     this.selected = test
    //     // commit("fetchList", test);
    //   })
    //   .catch(function (error) {
    //     console.log(error.response.data);
    //   });
    this.fetchSongs().then(() => {
      this.initialize();
    });
  },
};
</script>

<style scoped>
</style>