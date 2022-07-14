<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Añadir Pedido</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Numero de cliente: </label>
                </div>
                <select class="custom-select" id="inputGroupSelect01" @change="onChangeClientNumber(option.value)">
                    <option selected>Elegir...</option>
                    <option 
                    v-for="client in clientsData"
                    :key="client.key" 
                    :value="client.clientNumber"                                       
                    >{{client.clientNumber}}</option>
                </select>
                </div>
            
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Cliente: </label>
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                    <option selected>Elegir...</option>
                    <option 
                    v-for="client in clientsData"
                    :key="client.key"                    
                    >{{client.fullname}}</option>
                </select>
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
                    <button class="btn btn-primary btn-block">Añadir Cliente</button>
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
                },
                clientsData: [],
                clientNames: ""
            }
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('clients').add(this.user).then(() => {
                    alert("Cliente Añadido Correctamente");
                    this.user.names = ''
                    this.user.apaterno = ''
                    this.user.amaterno = ''
                    this.user.clientNumber = ''
                    this.user.street = ''
                    this.user.number = ''
                    this.user.colofracc = ''
                    this.user.otherAddress = ''
                    this.user.phone = ''
                    this.user.otherPhones = ''
                }).catch((error) => {
                    alert("Error Al Añadir Cliente");
                });
            },
            onChangeClientNumber(numClient){
                console.log("entre al onchange?")
                db
                .collection("clients")
                .where("clientNumber", "==", numClient)
                .get()
                .then(async (Item) => {
                    console.log("el item", Item)
                    this.clientsName = Item
                });
                
            }
        },
        
        created: async function() {
            await db.collection('clients').onSnapshot((snapshotChange) => {
                this.clientsData = [];
                snapshotChange.forEach((doc) => {                    
                    let clientFullName = doc.data().names + " " + doc.data().apaterno + " " + doc.data().amaterno
                    this.clientsData.push({
                        key: doc.id,
                        names: doc.data().names,
                        apaterno: doc.data().apaterno,
                        amaterno: doc.data().amaterno,
                        fullname: clientFullName,
                        clientNumber: doc.data().clientNumber
                    })
                });            
            })
            
            
        },
    }
</script>