<template>
  <v-app>
    <v-app-bar elevation="5" absolute color="deep-purple accent-4" dark>
      <v-toolbar-title class="font-weight-black">Do-erz</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </v-app-bar>
    <div style="margin-top: 66px"></div>
    <div style="" v-if="$store.getters.loading">
      <v-progress-linear indeterminate color="red"></v-progress-linear>
    </div>
    <v-alert
      v-if="$store.getters.message != ''"
      style="width: 50%; margin: 0 auto; margin-top: 20px"
      text
      dense
      color="teal"
      icon="mdi-clock-fast"
      border="left"
    >
      {{ $store.getters.message }}
    </v-alert>

    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
