<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row">
    <!-- div fecha-->
    <p class="form-subtitle">
      <b>Fecha inicio: {{ pickerInicio }}</b>
    </p>
    <div class="col-md-12">
      <v-row justify="center">
        <v-date-picker
          color="indigo"
          locale="es-mx"
          v-model="pickerInicio"
        ></v-date-picker>
      </v-row>
    </div>

    <p class="form-subtitle">
      <b>Fecha final: {{ pickerFinal }}</b>
    </p>
    <div class="col-md-12">
      <v-row justify="center">
        <v-date-picker
          color="indigo"
          locale="es-mx"
          v-model="pickerFinal"
        ></v-date-picker>
      </v-row>
    </div>

    <v-btn
      color="primary"
      dark
      @click="reportByDate()"
      v-if="!flag_showdownload"
    >
      Confirmar Fechas de Reporte
    </v-btn>

    <json-excel
      v-if="flag_showdownload"
      class="btn btn-default"
      :data="Orders"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="filename.xls"
    >
      Descargar Excel
    </json-excel>
  </div>
  </app>
</template>
<script>
import { db } from "../firebaseDb";
import navbar from "@/components/navigation";
import JsonExcel from "vue-json-excel";

export default {
  components: {
    JsonExcel,
    navbar
  },
  data() {
    return {
      pickerInicio: null,
      pickerFinal: null,
      Orders: [],
      flag_showdownload: false,
      json_fields: {
        "Número de Cliente": "clientKey",
        "Fecha Creación": "created",
        "¿Pedido Activo?": "enabled",
        "¿Entrega Asignada?": "deliveryAssigned",
        "Númer de Pedido": "orderNumber",
        "Total del Pedido": "orderTotal",
        "Tipo de Envio": "sendingType",
        "Nombre(s)": "clientName",
        "Apellido Paterno": "clientApaterno",
        "Apellido Materno": "clientAmaterno",
        Productos: "products",
      },
    };
  },

  methods: {
    async reportByDate() {
      this.Orders = [];
      console.log("pickers", this.pickerInicio, this.pickerFinal);
      await db
        .collection("orders")
        .where("created", ">=", this.pickerInicio)
        .where("created", "<=", this.pickerFinal)
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach(async (doc) => {
            var clientName = "";
            var clientApaterno = "";
            var clientAmaterno = "";
            var myJSON = JSON.stringify(doc.data().products);
            var newjsonstring = myJSON.replace(/,/g, "\n");
            let dbRef = db.collection("clients").doc(doc.data().clientKey);
            await dbRef
              .get()
              .then((client) => {
                console.log("data cliente", client.data().names);

                clientName = client.data().names;
                clientApaterno = client.data().apaterno;
                clientAmaterno = client.data().amaterno;
              })
              .catch((error) => {
                console.log(error);
              });

            this.Orders.push({
              key: doc.id,
              clientKey: doc.data().clientKey,
              clientNumber: doc.data().clientNumber,
              created: doc.data().created,
              deliveryAssigned: doc.data().deliveryAssigned,
              enabled: doc.data().enabled,
              orderNumber: doc.data().orderNumber,
              orderTotal: doc.data().orderTotal,
              products: newjsonstring,
              sendingType: doc.data().sendingType,
              clientName: clientName,
              clientApaterno: clientApaterno,
              clientAmaterno: clientAmaterno,
            });
          });
          console.log(this.Orders);
        });
      this.flag_showdownload = true;
    },
  },
  created: async function () {
    if (sessionStorage.getItem("loged") == "false" || sessionStorage.getItem("loged") == null ) {
      alert('Inicia sesión para continuar')
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
  },
 
};
</script>
<style>
.btn-primary {
  margin-right: 12px;
}
</style>