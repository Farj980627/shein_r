<template>
  <v-app>
    <navbar />
    <br/>
    <br/>
    <br/>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center">Iniciar Sesión</h3>
        <form @submit.prevent="onFormSubmit">
          <div class="form-group">
            <label>E-mail:</label>
            <input
              type="email"
              class="form-control"
              v-model="user.email"
              required
            />
          </div>
          <div class="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              required
            />
          </div>

          <br />
          <div class="form-group">
            <button class="btn btn-primary btn-block">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  </v-app>
</template>
<script>
import { db } from "../firebaseDb";
import firebase from "firebase";
import navbar from "@/components/navigation";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async onFormSubmit(event) {
      event.preventDefault();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(async (userCredential) => {
          // Signed in
          var user = userCredential.user;

          await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then(async (userInfo) => {
              sessionStorage.setItem("loged", true);
              sessionStorage.setItem("username", userInfo.data().names);
              sessionStorage.setItem("userpaterno", userInfo.data().apaterno);
              sessionStorage.setItem("useramaterno", userInfo.data().amaterno);
              setTimeout(
                () =>
                  this.$router.push("/").catch((err) => {
                    console.log(err);
                  }),
                800
              );
            });

          // ...
        });
    },
  },
};
</script>