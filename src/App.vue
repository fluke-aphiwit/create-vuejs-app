<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style media="screen" lang="scss">
.v-application {
  font-family: "K2D", sans-serif !important;
  margin: 0px;
  background-color: "#fafafa";
}
.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)
  > .swal2-modal {
  margin: auto;
  font-family: K2D, sans-serif !important;
}
.v-container {
  background-color: "#fafafa";
}
</style>
