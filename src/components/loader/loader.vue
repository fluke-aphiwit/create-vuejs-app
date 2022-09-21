<template>
  <v-dialog v-model="this.$store.state.dialog_loader" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text class="text-center" color="white">
        Waiting . .
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog_loader: false,
    };
  },
};
</script>

<style>
</style>