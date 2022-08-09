<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Crear Usuario</h3>
      <form @submit.prevent="onFormSubmit">
        <div class="form-group">
          <label>Nombre(s):</label>
          <input
            type="text"
            class="form-control"
            v-model="user.names"
            required
          />
        </div>
        <div class="form-group">
          <label>A. Paterno:</label>
          <input
            type="text"
            class="form-control"
            v-model="user.apaterno"
            required
          />
        </div>
        <div class="form-group">
          <label>A. Materno:</label>
          <input
            type="text"
            class="form-control"
            v-model="user.amaterno"
            required
          />
        </div>
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
          <button class="btn btn-primary btn-block">Crear Usuario</button>
        </div>
      </form>
    </div>
  </div>
  </app>
</template>
<script>
import navbar from "@/components/navigation"
import { db } from "../firebaseDb";
import firebase from "firebase";
export default {
  components: {navbar},
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async onFormSubmit(event) {
      event.preventDefault();
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(async (userRegistered) => {
            this.user.uid = userRegistered.user.uid
              await db
                .collection("users")
                .doc(userRegistered.user.uid)
                .set(this.user)
                .then(() => {
                  alert("Registro de Usuario exitoso");
                  setTimeout(() => {
                    this.$router.push("/login").catch((err) => {
                      console.log(err);
                    });
                  }, 5000);
                });
            
        }) //devolver el error con el snackbar
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("El correo " + this.user.email + " ya existe")
              break;
            case "auth/weak-password":
                alert("La contraseña debe ser al menos 6 caracteres")
          }
        });
    },
  },
  created() {
    if (sessionStorage.getItem("loged") == "false" || sessionStorage.getItem("loged") == null ) {
      alert('Inicia sesión para continuar')
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>