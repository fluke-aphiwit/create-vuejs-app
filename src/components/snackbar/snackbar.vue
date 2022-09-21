<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="$store.state.snackbar">
      {{ $store.state.text_snackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" v-bind="attrs" @click="close()"> Submit </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$store.state.snackbar = false;
      this.$store.state.text_snackbar = "";
    },
  },
};
</script>

<style>
</style>