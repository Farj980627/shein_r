<template>
  <app>
    <navbar />
    <br />
    <br />
    <br />

    <div class="row">
      <!-- selecciona el cliente-->
      <span>Selecciona el dia de entrega</span>
      <!-- div pedidos activos-->
      <!--<div class="col-md-12">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Número</th>
            <th>Total</th>
            <th>Envío</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in Orders" :key="order.key">
            <td>{{ order.orderNumber }}</td>
            <td>{{ "$" + order.orderTotal }}</td>
            <td>{{ order.sendingType }}</td>
            <td>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="orderSelected(order.key)">
                    Asignar Repartidor
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5"
                      >A continuación elige un repartidor:</span
                    >
                  </v-card-title>
                  <div style="width: 100%">
                    <select
                      v-model="deliveryman"
                      style="
                        text-align: center;
                        color: white;
                        width: 100%;
                        background-color: gray;
                      "
                    >
                      <option
                        v-for="del in Deliverymans"
                        v-bind:key="del.key"
                        :value="del.key"
                      >
                        {{ del.fullname }}
                      </option>
                    </select>
                  </div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="createDelivery(deliveryman)"
                    >
                      Asignar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->

      <v-date-picker
        v-model="picker2"
        color="green lighten-1"
        header-color="primary"
      ></v-date-picker>

      <span
        >Dia seleccionado: <strong>{{ picker2 }}</strong></span
      >
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Repartidor</th>
              <th>Turno</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="del in Deliverymans" :key="del.key">
              <td>{{ del.fullname }}</td>
              <td>{{ del.turn }}</td>
              <td>
                <v-btn
                      color="primary"
                      dark
                      @click="delSelected(del.key)"
                    >
                      Asignar Pedido
                    </v-btn>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  
                    
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"
                        >A continuación elige un número de pedido:</span
                      >
                    </v-card-title>
                    <div style="width: 100%">
                      <select
                        v-model="order"
                        style="
                          text-align: center;
                          color: white;
                          width: 100%;
                          background-color: gray;
                        "
                      >
                        <option
                          v-for="ord in Orders"
                          v-bind:key="ord.key"
                          :value="ord.key"
                        >
                          {{ ord.orderNumber }}
                        </option>
                      </select>
                      <v-spacer />
                      <br />
                      <p class="form-subtitle"><b>Horario de Entrega: </b></p>
                      <v-text-field
                        required
                        v-model="hourText"
                        type="text-center"
                        clearable
                      />
                    </div>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="createDelivery(order)"
                      >
                        Asignar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
import moment from "moment";
import navbar from "@/components/navigation";

export default {
  components: { navbar },
  data() {
    return {
      Deliverymans: [],
      DeliveryNames: [],
      order: "",
      Orders: [],
      dialog: false,
      delKeySelected: "",
      picker2: "",
      hourText: "",
    };
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
    db.collection("deliverymans").onSnapshot((snapshotChange) => {
      this.Deliverymans = [];
      this.DeliveryNames = [];
      snapshotChange.forEach((doc) => {
        var fullname =
          doc.data().names +
          " " +
          doc.data().apaterno +
          " " +
          doc.data().amaterno;
        this.Deliverymans.push({
          key: doc.id,
          names: doc.data().names,
          apaterno: doc.data().apaterno,
          amaterno: doc.data().amaterno,
          turn: doc.data().turn,
          fullname: fullname,
        });
        this.DeliveryNames.push(fullname);
      });
    });
    db.collection("orders")
      .where("enabled", "==", true)
      .where("deliveryAssigned", "==", false)
      .onSnapshot((snapshotChange) => {
        this.Orders = [];
        snapshotChange.forEach((doc) => {
          this.Orders.push({
            key: doc.id,
            orderNumber: doc.data().orderNumber,
            orderTotal: doc.data().orderTotal,
            sendingType: doc.data().sendingType,
          });
        });
      });
  },
  methods: {
    delSelected(key) {
      if (this.picker2 == "") {
        
        alert("Selecciona una fecha");
        this.dialog = false;
        
      } else {
        this.delKeySelected = key;
        this.dialog = true
      }
    },
    createDelivery(id) {
      
      moment.locale();
      const dataDelivery = {
        orderKey: id,
        deliverymanKey: this.delKeySelected,
        enabled: true,
        created: moment().format("YYYY-MM-DD"),
        deliveryDate: this.picker2,
        hourDalivery: this.hourText,
      };
      if (this.hourText == "") {
        alert("Favor de indicar hora de entrega");
      } else {
        db.collection("deliverys")
          .add(dataDelivery)
          .then(() => {
            db.collection("orders")
              .doc(id)
              .update({ deliveryAssigned: true })
              .then(() => {
                alert("Pedido Asignado Correctamente!!");
                window.location.reload(true);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            alert("Error Al Asignar Cliente");
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