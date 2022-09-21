<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <h1 class="animate__animated animate__fadeInDownBig vertical-center hide">
          Neversitup
        </h1>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="6">
            <v-card max-width="900" tile>
              <v-row>
                <v-col cols="12" md="5" style="background-color: #22468d">
                  <v-container fill-height>
                    <v-row justify="center" align="center">
                      <div class="mt-12">
                        <img
                          src="@/assets/login.jpg"
                          style="width: 55%; min-width: 300px"
                        />
                      </div>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col cols="12" md="7">
                  <v-card-title class="headline"> </v-card-title>
                  <v-form ref="form_login" @submit.prevent="login()">
                    <v-card-text>
                      <div style="text-align: center">
                        <div>
                          <br />
                          <span style="font-size: 24px">
                            <B> Login </B>
                          </span>
                          &nbsp;
                        </div>
                      </div>
                      <div class="px-12 mt-8" align="center">
                        <div class="px-2">
                          <v-text-field
                            prepend-icon="mdi-account"
                            label="Username"
                            v-model="form_login.username"
                            :rules="usernameRules"
                          ></v-text-field>
                          <v-text-field
                            prepend-icon="mdi-lock"
                            label="Password"
                            v-model="form_login.password"
                            :rules="passwordRules"
                            :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="isShowPassword = !isShowPassword"
                            :type="isShowPassword ? 'text' : 'password'"
                          ></v-text-field>
                          <div class="d-flex justify-end">
                            <span style="cursor: pointer; font-size: 12px">
                              <U>Forget Password?</U>
                            </span>
                          </div>
                        </div>
                        <v-card-actions class="align-center justify-center">
                          <v-btn
                            style="
                              width: 120px;
                              max-width: 100%;
                              background-color: rgb(0, 60, 179, 0.84);
                            "
                            class="pa-1 mt-3"
                            dark
                            type="submit"
                          >
                            เข้าสู่ระบบ
                          </v-btn>
                        </v-card-actions>
                      </div>
                    </v-card-text>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <loader />
    <snackbar />
  </v-app>
</template>

<script>
import loader from "../components/loader/loader.vue";
import snackbar from "../components/snackbar/snackbar.vue";
export default {
  components: { loader, snackbar },
  data() {
    return {
      isShowPassword: false,
      token: "",
      form_login: {
        username: "",
        password: "",
      },
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    login() {
      console.log(this.form_login);
      if (!this.$refs.form_login.validate()) {
        return;
      } else {
        // this.$store.commit("SET_Snackbar", true);
        this.axios
          .post(process.env.VUE_APP_API + "/users/auth", this.form_login)
          .then((response) => {
            console.log(response.status == 200);
            if (response.status == 200) {
              localStorage.setItem("token", response.data.token);
              this.$router.push("/Create");
              this.$store.commit("SET_Snackbar", false);
            }
          })
          .catch((error) => {
            // console.log(typeof(error.response.data.message));
            this.$store.state.text_snackbar = error.response.data.message;
            this.$store.commit("SET_Snackbar", true);
          });
      }
    },
  },
};
</script>

<style>
.vertical-center {
  animation-duration: 1.25s;
  margin: 0;
  position: absolute;
  top: 16.5%;
  left: 25.5%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
