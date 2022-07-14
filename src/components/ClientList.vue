<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>A. Paterno</th>
                        <th>A. Materno</th>
                        <th>Núm. Cliente</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key">
                        <td>{{ user.names }}</td>
                        <td>{{ user.apaterno }}</td>
                        <td>{{ user.amaterno }}</td>
                        <td>{{ user.clientNumber }}</td>
                        <td>
                            <router-link :to="{name: 'Edit', params: { id: user.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: []
            }
        },
        created() {
            db.collection('clients').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    console.log('data firebase', doc.data())
                    this.Users.push({
                        key: doc.id,
                        names: doc.data().names,
                        apaterno: doc.data().apaterno,
                        amaterno: doc.data().amaterno,
                        clientNumber: doc.data().clientNumber
                    })
                });
            })
            console.log("usuarios", this.Users)
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Seguro que deseas elimar este usuario?? No podras recuperar sus datos")) {
                db.collection("clients").doc(id).delete().then(() => {
                    alert("Cliente Eliminado");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>
<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>