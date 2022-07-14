<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Editar Cliente</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Nombre(s):</label>
                    <input type="text" class="form-control" v-model="user.names" required>
                </div>
                <div class="form-group">
                    <label>A. Paterno:</label>
                    <input type="text" class="form-control" v-model="user.apaterno" required>
                </div>
                <div class="form-group">
                    <label>A. Materno:</label>
                    <input type="text" class="form-control" v-model="user.amaterno" required>
                </div>
                <div class="form-group">
                    <label>Número de Cliente:</label>
                    <input type="text" class="form-control" v-model="user.clientNumber" required>
                </div>
                <div class="form-group">
                    <label>Calle:</label>
                    <input type="text" class="form-control" v-model="user.street" required>
                </div>
                <div class="form-group">
                    <label>Número:</label>
                    <input type="text" class="form-control" v-model="user.number" required>
                </div>
                <div class="form-group">
                    <label>Col. o Fracc.:</label>
                    <input type="text" class="form-control" v-model="user.colofracc" required>
                </div>
                <div class="form-group">
                    <label>Direcciones Alternativas:</label>
                    <input type="text" class="form-control" v-model="user.otherAddress">
                </div>
                
                <div class="form-group">
                    <label>Teléfono:</label>
                    <input type="text" class="form-control" v-model="user.phone" required>
                </div>

                <div class="form-group">
                    <label>Telefonos Alternativos:</label>
                    <input type="text" class="form-control" v-model="user.otherPhones">
                </div>
                <br/>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import { db } from '../firebaseDb';
    export default {
        data() {
            return {
                user: {
                }
            }
        },
        created() {
            let dbRef = db.collection('clients').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('clients').doc(this.$route.params.id)
                .update(this.user).then(() => {
                    alert("Información Guardada Con Exito!");
                    this.$router.push('/list')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>