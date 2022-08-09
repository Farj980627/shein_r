<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Editar Cliente</h3>
      <form @submit.prevent="onUpdateForm">
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
        <br />
        <v-select
          background-color="rgba(202,210,208,0.8)"
          color="black"
          v-model="user.turn"
          outlined
          placeholder="Turno:"
          :items="turns"
        >
          <template v-slot:selection="{ item }">
            <span
              style="
                font-size: 2rem;
                color: rgb(0, 0, 0);
                text-align: center;
                width: 100%;
              "
              >{{ item }}</span
            >
          </template>
        </v-select>
        <br />
        <div class="form-group">
          <button class="btn btn-primary btn-block">Actualizar</button>
        </div>
      </form>
    </div>
  </div>
</app>
</template>
<script>
import { db } from "../firebaseDb";
import navbar from "@/components/navigation"
export default {
  components: {navbar},
  data() {
    return {
      user: {},
      turns: ["Mañana", "Tarde"],
    };
  },
  created() {
    if (sessionStorage.getItem("loged") == "false" || sessionStorage.getItem("loged") == null ) {
      alert('Inicia sesión para continuar')
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
    let dbRef = db.collection("deliverymans").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.user = doc.data();
        doc.data().turn == "Mañana"
          ? (this.user.turn = "Mañana")
          : (this.user.turn = "Tarde");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("deliverymans")
        .doc(this.$route.params.id)
        .update(this.user)
        .then(() => {
          alert("Información Guardada Con Exito!");
          this.$router.push("/list");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>