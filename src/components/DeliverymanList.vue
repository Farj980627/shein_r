<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>A. Paterno</th>
            <th>A. Materno</th>
            <th>Turno</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in Users" :key="user.key">
            <td>{{ user.names }}</td>
            <td>{{ user.apaterno }}</td>
            <td>{{ user.amaterno }}</td>
            <td>{{ user.turn }}</td>
            <td>
              <router-link
                :to="{ name: 'EditDeliveryman', params: { id: user.key } }"
                class="btn btn-primary"
                >Edit
              </router-link>
              <button
                @click.prevent="deleteUser(user.key)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      Users: [],
    };
  },
  created() {
    if (sessionStorage.getItem("loged") == "false" || sessionStorage.getItem("loged") == null ) {
      alert('Inicia sesión para continuar')
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
    db.collection("deliverymans").onSnapshot((snapshotChange) => {
      this.Users = [];
      snapshotChange.forEach((doc) => {
        this.Users.push({
          key: doc.id,
          names: doc.data().names,
          apaterno: doc.data().apaterno,
          amaterno: doc.data().amaterno,
          turn: doc.data().turn,
        });
      });
    });
  },
  methods: {
    deleteUser(id) {
      if (
        window.confirm(
          "Seguro que deseas elimar este usuario?? No podras recuperar sus datos"
        )
      ) {
        db.collection("deliverymans")
          .doc(id)
          .delete()
          .then(() => {
            alert("Repartidor Eliminado");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
<style>
.btn-primary {
  margin-right: 12px;
}
</style>