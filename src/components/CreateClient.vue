<template>
  <app>
    <navbar />
    <br/>
    <br/>
    <br/>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center">Añadir Cliente</h3>
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
            <label>Número de Cliente:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.clientNumber"
              required
            />
          </div>
          <div class="form-group">
            <label>Calle:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.street"
              required
            />
          </div>
          <div class="form-group">
            <label>Número:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.number"
              required
            />
          </div>
          <div class="form-group">
            <label>Col. o Fracc.:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.colofracc"
              required
            />
          </div>
          <div class="form-group">
            <label>Direcciones Alternativas:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.otherAddress"
            />
          </div>

          <div class="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.phone"
              required
            />
          </div>

          <div class="form-group">
            <label>Telefonos Alternativos:</label>
            <input
              type="text"
              class="form-control"
              v-model="user.otherPhones"
            />
          </div>
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
import { db } from "../firebaseDb";
import navbar from "@/components/navigation";
export default {
    components: {
        navbar
    },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("clients")
        .add(this.user)
        .then(() => {
          alert("Cliente Añadido Correctamente");
          this.user.names = "";
          this.user.apaterno = "";
          this.user.amaterno = "";
          this.user.clientNumber = "";
          this.user.street = "";
          this.user.number = "";
          this.user.colofracc = "";
          this.user.otherAddress = "";
          this.user.phone = "";
          this.user.otherPhones = "";
        })
        .catch((error) => {
          alert("Error Al Añadir Cliente");
        });
    },
  },
  created() {
    if (
      sessionStorage.getItem("loged") == "false" ||
      sessionStorage.getItem("loged") == null
    ) {
      alert("Inicia sesión para continuar");
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>
