<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Añadir Repartidor</h3>
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
          <button class="btn btn-primary btn-block">Añadir Cliente</button>
        </div>
      </form>
    </div>
  </div>
</app>
</template>
<script>
import navbar from "@/components/navigation"
import { db } from "../firebaseDb";
export default {
  components: {navbar},
  data() {
    return {
      user: {},
      turns: ["Mañana", "Tarde"],
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("deliverymans")
        .add(this.user)
        .then(() => {
          alert("Repartidor Añadido Correctamente");
          this.user.names = "";
          this.user.apaterno = "";
          this.user.amaterno = "";
          this.user.turn = "";
        })
        .catch((error) => {
          alert("Error Al Añadir Repartidor");
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
  },
};
</script>