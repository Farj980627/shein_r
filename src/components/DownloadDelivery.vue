<template>
  <app>
    <navbar />
    <br />
    <br />
    <br />
    <span> Selecciona el dia: </span>
    <br />
    <v-date-picker
      v-model="picker2"
      color="green lighten-1"
      header-color="primary"
    ></v-date-picker>
    <br />
    <span
      >Dia seleccionado: <strong>{{ picker2 }}</strong></span
    >
    <br />
    <div class="row">
      <div class="col-md-12">
        <v-row justify="center">
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
                    v-if="!flag_excel"
                    color="primary"
                    dark
                    @click="generatePDF(del.key)"
                  >
                    Ver sus pedidos
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </v-row>
      </div>
    </div>
    <v-btn v-if="flag_excel" @click="flag_excel = false">
      <json-excel
        
        class="btn btn-default"
        :data="arrayTotalData"
        :fields="json_fields"
        worksheet="My Worksheet"
        :name="nameExcel"
      >
        Descargar Excel
      </json-excel>
    </v-btn>
  </app>
</template>
<script>
import { db } from "../firebaseDb";
import navbar from "@/components/navigation";
import moment from "moment";
import JsonExcel from "vue-json-excel";
import "jspdf-autotable";

export default {
  components: { navbar, JsonExcel },
  data() {
    return {
      picker2: "",
      flag_excel: false,
      OrdersNum: [],
      ordNum: null,
      Order: [],
      products: [],
      Deliverymans: [],
      DeliveryNames: [],
      clientKey: "",
      arrayTotalData: [],
      objClient: {},
      clientKey: "",
      orderTotal: "",
      sendingType: "",
      nameExcel: "",
      json_fields: {
        Nombre: "clientFullname",
        Domicilio: "clientDom",
        "Otro Domicilio": "clientOtherDom",
        Teléfono: "clientPhone",
        "Otro Teléfono": "clientOtherPhones",
        "Hora Entrega": "deliveryHour",
        Envío: "sendingType",
        "Coste del Pedido + envío": "orderTotal",
      },
    };
  },

  methods: {
    async generatePDF(delkey) {
      this.Order = [];
      this.nameExcel = moment().format();
      var vecesqueiter = 0;
      var orderSizes = 0;
      if (this.picker2 == "") {
        alert("Selecciona una fecha");
      } else {
        await db
          .collection("deliverys")
          .where("deliverymanKey", "==", delkey)
          .where("deliveryDate", "==", this.picker2)
          .onSnapshot((snapshotChange) => {
            orderSizes = snapshotChange.size;
            var clientKey = "";
            var clientName = "";
            var clientApaterno = "";
            var clientAmaterno = "";
            var clientDom = "";
            var clientOtherDom = "";
            var clientPhone = "";
            var clientOtherPhones = "";
            var orderTotal = "";
            var sendingType = "";
            let docs = snapshotChange.docs;
            for (var x = 0; x < orderSizes; x++) {
              let document = docs[x].data();
              let deliveryHour = document.hourDalivery;
              let dbRefClient = db.collection("orders").doc(document.orderKey);
              dbRefClient
                .get()
                .then((order) => {
                  this.clientKey = order.data().clientKey;
                  let dbRef = db
                    .collection("clients")
                    .doc(order.data().clientKey);
                  dbRef
                    .get()
                    .then((client) => {
                      orderTotal = order.data().orderTotal;
                      sendingType = order.data().sendingType;
                      clientKey = order.data().clientKey;
                      clientName = client.data().names;
                      clientApaterno = client.data().apaterno;
                      clientAmaterno = client.data().amaterno;
                      clientDom =
                        client.data().street +
                        " " +
                        client.data().number +
                        " " +
                        client.data().colofracc;
                      clientOtherDom = client.data().otherAddress;
                      clientPhone = client.data().phone;
                      clientOtherPhones = client.data().otherPhones;

                      var clientFullname =
                        clientName +
                        " " +
                        clientApaterno +
                        " " +
                        clientAmaterno;
                      this.arrayTotalData.push({
                        clientKey: clientKey,
                        clientFullname: clientFullname,
                        clientDom: clientDom,
                        clientOtherDom: clientOtherDom,
                        clientPhone: clientPhone,
                        clientOtherPhones: clientOtherPhones,
                        deliveryHour: deliveryHour,
                        orderTotal: orderTotal,
                        sendingType: sendingType,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
              vecesqueiter++;
            }
            console.log(vecesqueiter);
            //this.dataPDF(this.arrayTotalData);
          });
        this.flag_excel = true;
      }
    },
  },
  async created() {
    if (
      sessionStorage.getItem("loged") == "false" ||
      sessionStorage.getItem("loged") == null
    ) {
      alert("Inicia sesión para continuar");
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
    await db.collection("deliverymans").onSnapshot((snapshotChange) => {
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
  },
};
</script>
<style>
.btn-primary {
  margin-right: 12px;
}
</style>