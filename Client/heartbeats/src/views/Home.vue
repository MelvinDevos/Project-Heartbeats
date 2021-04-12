<template>
  <v-container fill-height class="home" fluid>
    <v-row justify="center">
      <v-col md="6">
        <v-card class="pa-8" outlined elevation="8">
          <v-card-title> Login </v-card-title>
          <v-card-subtitle> Gelieve u eerst in te loggen: </v-card-subtitle>
          <v-form @submit.prevent="login">
            <v-container>
              <v-row justify="center">
                <v-col cols="11">
                  <v-text-field
                    :type="'email'"
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    append-icon="mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="11">
                  <v-text-field
                    :type="'password'"
                    v-model="password"
                    :rules="passwordRules"
                    label="Wachtwoord"
                    append-icon="lock"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-row justify="space-around">
                  <v-btn
                    class="px-10 mt-8 primary"
                    type="submit"
                    depressed
                    rounded
                    >Login</v-btn
                  >
                </v-row>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home {
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is verplicht",
      (v) => /.+@.+/.test(v) || "E-mail moet correct zijn",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Wachtwoord is verplicht",
      (v) => v.length >= 3 || "Wachtwoord moet minstens 3 karakters bevatten",
    ],
  }),
  methods: {
    login: function () {
      console.log("logging in...");
    },
  },
};
</script>
