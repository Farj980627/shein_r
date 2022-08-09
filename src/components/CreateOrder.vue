<template>
<app>
  <navbar />
  <br/>
    <br/>
    <br/>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Añadir Pedido</h3>

      <p class="form-subtitle"><b>Elige el número de cliente</b></p>
      <v-select
        background-color="rgba(202,210,208,0.8)"
        color="black"
        @change="onChangeClientNumber(clientNum)"
        v-model="clientNum"
        outlined
        placeholder="Selecciona el Núm del cliente"
        :items="clientNumberArray"
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

      <!-- nombres cliente-->
      <p class="form-subtitle"><b>Nombre del Cliente</b></p>
      <v-text-field
        required
        v-model="clientFullName"
        type="text-center"
        clearable
        :readonly="true"
      />

      <!-- telefono cliente-->
      <p class="form-subtitle"><b>Telefono del Cliente</b></p>
      <v-text-field
        required
        v-model="clientPhone"
        type="text-center"
        clearable
        :readonly="true"
      />

      <!-- direccion cliente-->
      <p class="form-subtitle"><b>Dirección del Cliente</b></p>
      <v-text-field
        required
        v-model="clientAddress"
        type="text-center"
        clearable
        :readonly="true"
      />
      <br />
      <h3 class="text-center">Información del Producto</h3>

      <!-- modal para agregar prod-->
      <p class="form-subtitle"><b>Número de Pedido:</b></p>
      <v-text-field
        required
        v-model="orderNumber"
        type="text-center"
        clearable
      />

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Capturar Producto
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5"
              >A continuación teclea la información de tu producto</span
            >
          </v-card-title>
          <p class="form-subtitle"><b>Producto: </b></p>
          <v-text-field
            required
            v-model="productText"
            type="text-center"
            clearable
          />

          <p class="form-subtitle"><b>SKU: </b></p>
          <v-text-field
            required
            v-model="skuText"
            type="text-center"
            clearable
          />

          <p class="form-subtitle"><b>Descripción: </b></p>
          <v-text-field
            required
            v-model="descText"
            type="text-center"
            clearable
          />
          <p class="form-subtitle"><b>Precio Unitario: </b></p>
          <v-text-field
            required
            v-model="priceText"
            type="text-center"
            clearable
          />
          <p class="form-subtitle"><b>Piezas: </b></p>
          <v-text-field
            required
            v-model="pzText"
            type="text-center"
            clearable
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelProducts">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="addProducts">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Productos.....Tabla -->
      <v-data-table
        :headers="headers"
        :items="productsArray"
        class="elevation-1"
      ></v-data-table>

      <!-- radio buttos envio-->
      <v-select
        v-model="sendType"
        outlined
        @change="changeEnvio()"
        placeholder="Tipo de Envío"
        :items="tipoEnvioArray"
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

      <!--total del pedido-->
      <p class="form-subtitle">
        <b>Total: ${{ orderTotal }}</b>
      </p>

      <!-- boton guardar pedido-->
      <v-btn color="primary" dark @click="createOrder()">
        Guardar Producto
      </v-btn>

      <br />
    </div>
  </div>
</app>
</template>
<script>
import moment from "moment";
import { db } from "../firebaseDb";
import navbar from "@/components/navigation"
export default {
  components: {navbar},
  data() {
    return {
      user: {},
      clientsData: [],
      headers: [
        {
          text: "Producto:",
          align: "left",
          sortable: false,
          value: "producto",
        },
        { text: "SKU", value: "sku" },
        { text: "Descripción", value: "descripcion" },
        { text: "Precio Unitario", value: "precio" },
        { text: "piezas", value: "piezas" },
      ],
      clientNumberArray: [],
      clientFullName: "",
      clientPhone: "",
      clientAddress: "",
      clientNum: "",
      productsArray: [],
      productText: "",
      skuText: "",
      descText: "",
      priceText: "",
      pzText: "",
      dialog: false,
      orderNumber: "",
      tipoEnvioArray: ["Envío Express", "Envio Estándar"],
      sendType: "",
      orderTotal: 0,
      clientKey: "",
    };
  },
  methods: {
    onChangeClientNumber(numClient) {
      console.log("entre al onchange?");
      db.collection("clients")
        .where("clientNumber", "==", numClient)
        .get()
        .then(async (Item) => {
          Item.forEach((doc) => {
            this.clientKey = doc.id;
            this.clientFullName =
              doc.data().names +
              " " +
              doc.data().apaterno +
              " " +
              doc.data().amaterno;
            this.clientPhone = doc.data().phone;
            this.clientAddress =
              "Calle: " +
              doc.data().street +
              " " +
              doc.data().number +
              ", " +
              "Colonia o Fraccionamiento: " +
              doc.data().colofracc;
          });
        });
    },
    addProducts() {
      this.productsArray.push({
        producto: this.productText,
        sku: this.skuText,
        descripcion: this.descText,
        precio: this.priceText,
        piezas: this.pzText,
      });
      this.orderTotalMethod(this.priceText, this.pzText);
      this.sendType !== "" ? this.changeEnvio() : (this.sendType = "");
      this.productText = "";
      this.skuText = "";
      this.descText = "";
      this.priceText = "";
      this.pzText = "";

      this.dialog = false;
    },
    cancelProducts() {
      this.productText = "";
      this.skuText = "";
      this.descText = "";
      this.priceText = "";
      this.pzText = "";

      this.dialog = false;
    },
    orderTotalMethod(price, pzs) {
      let prdtotal = price * pzs;
      this.orderTotal += prdtotal;
    },
    changeEnvio() {
      let ordertotaloriginal = 0;
      let prdtotal;
      let allprd = this.productsArray.length;
      let allprdexpress = allprd * 15;
      this.productsArray.forEach((prd) => {
        prdtotal = prd.precio * prd.piezas;
        ordertotaloriginal += prdtotal;
      });
      this.sendType == "Envío Express"
        ? (this.orderTotal = ordertotaloriginal + allprdexpress)
        : (this.orderTotal = ordertotaloriginal);
    },
    createOrder() {
      moment.locale();
      const dataOrder = {
        clientNumber: this.clientNum,
        clientKey: this.clientKey,
        orderNumber: this.orderNumber,
        products: this.productsArray,
        sendingType: this.sendType,
        orderTotal: this.orderTotal,
        enabled: true,
        created: moment().format("YYYY-MM-DD"),
        deliveryAssigned: false,
      };
      db.collection("orders")
        .add(dataOrder)
        .then(() => {
          alert("Pedido Agregado Correctamente!!");
          window.location.reload(true);
        })
        .catch((error) => {
          alert("Error Al Añadir Cliente");
        });
    },
  },

  created: async function () {
    if (sessionStorage.getItem("loged") == "false" || sessionStorage.getItem("loged") == null ) {
      alert('Inicia sesión para continuar')
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    }
    await db.collection("clients").onSnapshot((snapshotChange) => {
      this.clientsData = [];
      snapshotChange.forEach((doc) => {
        let clientFullName =
          doc.data().names +
          " " +
          doc.data().apaterno +
          " " +
          doc.data().amaterno;
        this.clientsData.push({
          key: doc.id,
          names: doc.data().names,
          apaterno: doc.data().apaterno,
          amaterno: doc.data().amaterno,
          fullname: clientFullName,
          clientNumber: doc.data().clientNumber,
        });
        this.clientNumberArray.push(doc.data().clientNumber);
      });
    });
  },
};
</script>
