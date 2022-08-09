<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row">
    <!-- div fecha-->
    <p class="form-subtitle"><b>Numero de pedido: </b></p>
    <div class="col-md-12">
      <v-row justify="center">
        <v-select
          v-model="ordNum"
          outlined
          placeholder="Tipo de Envío"
          :items="OrdersNum"
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
      </v-row>
    </div>

    <v-btn color="primary" dark @click="generatePDF()"> Generar PDF </v-btn>
  </div>
</app>
</template>
<script>
import { db } from "../firebaseDb";
import navbar from "@/components/navigation";
import moment from "moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default {
  components: {navbar},
  data() {
    return {
      OrdersNum: [],
      ordNum: null,
      Order: [],
      products: [],
    };
  },

  methods: {
    async dataPDF(prds, clientFullname, totalOrder, envioType) {
      console.log("prds", prds)
      const columns = [
        { title: "Producto", dataKey: "producto" },
        { title: "Descripción", dataKey: "descripcion" },
        { title: "SKU", dataKey: "sku" },
        { title: "Precio", dataKey: "precio" },
        { title: "Piezas", dataKey: "piezas" },
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });
      // text is placed using x, y coordinates
      doc.setFontSize(16).text("Número de Pedido: " + this.ordNum, 0.5, 1.0);
      // create a line under heading
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // Using autoTable plugin
      doc.autoTable({
        columns,
        body: prds,
        margin: { left: 0.5, top: 1.25 },
      });
      // Using array of sentences
      doc.setFont("helvetica");
      doc.setFontSize(12);
      doc.text("Nombre del cliente: " + clientFullname, 0.5, 3.5, {
        align: "left",
        maxWidth: "7.5",
      });

      doc.setFont("helvetica");
      doc.setFontSize(12);
      doc.text("Tipo de envío: " + envioType, 0.5, 3.8, {
        align: "left",
        maxWidth: "7.5",
      });

      doc.setFont("helvetica");
      doc.setFontSize(11);
      doc.text("Total: $" + totalOrder, 0.5, 4.1, {
        align: "left",
        maxWidth: "7.5",
      });

      // Creating footer and saving file
      /*doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 255);
      doc.text(
        "This is a simple footer located .5 inches from page bottom",
        0.5,
        doc.internal.pageSize.height - 0.5
      );*/
      doc.save(`Pedido_${this.ordNum}.pdf`);

      this.ordNum = null;
    },

    async generatePDF() {
      this.Order = [];
      var clientName = "";
      var clientApaterno = "";
      var clientAmaterno = "";
      await db
        .collection("orders")
        .where("orderNumber", "==", this.ordNum)
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach(async (doc) => {
            let dbRef = db.collection("clients").doc(doc.data().clientKey);
            await dbRef
              .get()
              .then((client) => {
                clientName = client.data().names;
                clientApaterno = client.data().apaterno;
                clientAmaterno = client.data().amaterno;
              })
              .catch((error) => {
                console.log(error);
              });

            var clientFullname =
              clientName + " " + clientApaterno + " " + clientAmaterno;

            await this.dataPDF(
              doc.data().products,
              clientFullname,
              doc.data().orderTotal,
              doc.data().sendingType
            );
          });
        });
    },
  },
  async created() {
    if (sessionStorage.getItem("loged") == "false" || sessionStorage.getItem("loged") == null ) {
      alert('Inicia sesión para continuar')
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
    await db.collection("orders").onSnapshot((snapshotChange) => {
      this.OrdersNum = [];
      snapshotChange.forEach((doc) => {
        this.OrdersNum.push(doc.data().orderNumber);
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