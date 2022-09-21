<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap align-center justify-center>
          <v-card elevation="0">
            <v-card-text style="text-align: center" v-if="dataList.length === 0">
              Empty press 'Create'
              <br />
              for add new todo
            </v-card-text>
            <div v-for="(item, i) in dataList" :key="i" v-else>
              <v-card min-width="450px">
                <v-card-title>
                  <B><span>{{ item.title }}</span></B>
                  <v-spacer></v-spacer>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="EditToDo(item)"
                        color="blue"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-pencil
                      </v-icon>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        @click="DeleteToDo(item)"
                        color="red"
                      >
                        mdi-close
                      </v-icon>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-subtitle>
                  {{ item.description }}
                </v-card-subtitle>
                <div class="d-flex align-end pa-2">
                  <v-spacer></v-spacer>
                  <span style="font-size: 14px">
                    {{ moment(item.createdAt).format("DD-MM-YYYY") }}
                  </span>
                </div>
              </v-card>
              <br />
            </div>
            <v-card-actions class="justify-center">
              <v-btn
                depressed
                color="primary"
                width="180px"
                @click="createButton()"
              >
                Create <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
    
    <!-- v-dialog create -->
    <v-dialog v-model="create_dialog" persistent max-width="350">
      <v-card>
        <v-card-title
          class="headline"
          style="color: white; background: #428bca"
        >
          Add To Do <v-spacer></v-spacer>
          <v-icon @click="CancelCreate()" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="form_create">
            <v-textarea
              outlined
              name="input-7-1"
              label="Title"
              value=""
              v-model="form_create.title"
              :rules="TitleRules"
            ></v-textarea>
            <v-textarea
              outlined
              name="input-7-1"
              label="Description"
              value=""
              v-model="form_create.description"
              :rules="DescriptionRules"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" style="color: white" @click="CancelCreate()">
            Cancel
          </v-btn>
          <v-btn color="blue" style="color: white" @click="SaveCreate()">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog_edit -->

    <!-- v-dialog create -->
    <v-dialog v-model="edit_dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline" style="color: white; background: #428bca">
          Edit To Do <v-spacer></v-spacer>
          <v-icon @click="edit_dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="form_edit">
            <v-textarea
              outlined
              name="input-7-1"
              label="Title"
              value=""
              v-model="form_edit.title"
              :rules="TitleRules"
            ></v-textarea>
            <v-textarea
              outlined
              name="input-7-1"
              label="Description"
              value=""
              v-model="form_edit.description"
              :rules="DescriptionRules"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" style="color: white" @click="edit_dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue" style="color: white" @click="SaveEdit()">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <loader />
    <snackbar />
  </v-app>
</template>

<script>
import loader from "../components/loader/loader.vue";
import snackbar from "../components/snackbar/snackbar.vue";
import moment from "moment";
export default {
  components: { loader, snackbar },
  data() {
    return {
      moment,
      create_dialog: false,
      edit_dialog: false,
      dataList: [],
      form_create: {
        title: "",
        description: "",
      },
      form_edit: {
        title: "",
        description: "",
      },
      TitleRules: [(v) => !!v || "Title is required"],
      DescriptionRules: [(v) => !!v || "Description is required"],
    };
  },
  mounted() {
    this.GetTodo();
  },
  methods: {
    createButton() {
      this.create_dialog = true;
    },
    CancelCreate() {
      this.$refs.form_create.reset();
      this.create_dialog = false;
    },
    SaveCreate() {
      if (!this.$refs.form_create.validate()) {
        return;
      } else {
        this.$store.commit("SET_Loader", true);
        this.axios
          .post(process.env.VUE_APP_API + "/todos", this.form_create, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((Response) => {
            console.log(Response);
            this.$store.commit("SET_Loader", false);
            this.create_dialog = false;
            this.$swal({
              icon: "success",
              title: "Success!",
              text: "Create ToDo success.",
              confirmButtonText: "OK",
              allowOutsideClick: false,
            }).then(() => {
              this.$refs.form_create.reset();
              this.GetTodo();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    EditToDo(item) {
      //console.log(item);
      this.edit_dialog = true;
      this.form_edit.title = item.title;
      this.form_edit.description = item.description;
      this.form_edit._id = item._id;
      console.log("form_edit", this.form_edit);
    },
    SaveEdit() {
      console.log("this.form_edit._id", this.form_edit._id);
      if (!this.$refs.form_edit.validate()) {
        return;
      } else {
        this.axios.put(process.env.VUE_APP_API + "/todos/" + `${this.form_edit._id}`,this.form_edit,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          ).then((Response) => {
            console.log(Response.data);
            this.edit_dialog = false;
            this.$swal({
              icon: "success",
              title: "Success!",
              text: "Edit ToDo success.",
              confirmButtonText: "OK",
              allowOutsideClick: false,
            }).then(() => {
              this.GetTodo();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    DeleteToDo(item) {
      console.log(item._id);
      this.$swal({
        title: "Are you sure?",
        text: "You want to delete Todo!",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        console.log(result.value);
        if (result.value) {
          this.axios.delete(process.env.VUE_APP_API + "/todos/" + `${item._id}`, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }).then((Response) => {
              console.log(Response);
              this.$swal({
                icon: "success",
                title: "Success!",
                text: "Delete ToDo success.",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then(() => {
                this.GetTodo();
              });
            }).catch((error) => {
              console.log(error);
              this.$swal({
                icon: "error",
                title: "Error!",
                text: error.response.data.message,
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then(() => {
                this.GetTodo();
              });
            });
        }
      });
    },
    GetTodo() {
      this.$store.commit("SET_Loader", true);
      this.axios.get(process.env.VUE_APP_API + "/todos", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((Response) => {
          console.log(Response.data);
          this.$store.commit("SET_Loader", false);
          this.dataList = Response.data;
        }).catch((error) => {
          console.log(error);
          this.$store.commit("SET_Loader", false);
        });
    },
  },
};
</script>

<style></style>
