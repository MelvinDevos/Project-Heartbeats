<template>
  <nav>
    <v-toolbar>
      <v-app-bar-nav-icon @click="drawer = !drawer" large class="ml-1"></v-app-bar-nav-icon>
      <v-toolbar-title>Heartbeats vzw</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="px-5 primary" depressed rounded  @click="logout">
        <span>Log uit</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="grey lighten-5">
      <v-container fluid class="primary pt-10">
        <v-row justify="space-around">
          <v-avatar tile size="150">
            <img src="@/assets/logo.png" />
          </v-avatar>
        </v-row>
        <v-row>
          <v-col md="12">
            <v-card fluid class="mx-2">
              <v-card-title>Welkom!</v-card-title>
              <v-card-subtitle>{{getName}}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-list dense>
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title large>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/Dashboard" },
        { icon: "people_alt", text: "Patiënten", route: "/Patients" },
        { icon: "queue_music", text: "Muziek", route: "/Music" },
        //{ icon: "admin_panel_settings", text: "Beheerders", route: "/Admin" },
      ],
    };
  },
  computed: mapGetters(["getName"]),
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style scoped>
.atest {
  font-family: Roboto;
}
</style>