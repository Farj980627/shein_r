<template>
  <v-app-bar dark color="#CF8CA7" app>
    <v-app-bar-nav-icon
      @click="drawer2 = true"
      style="background-color: white"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <span>SHEIN DURANGO</span>
    <v-spacer></v-spacer>
    <router-link v-if="!logged" class="nav-link" to="/login"
      ><span id="opc">Iniciar Sesión</span></router-link
    >
    <v-navigation-drawer
      style="background: rgb(238, 174, 202)"
      v-model="drawer2"
      absolute
      temporary
      app
    >
      <ul v-if="logged">
        <div style="height: 100px"></div>
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/"
            ><span id="opc">Añadir Clientes</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list"
            ><span id="opc">Ver Clientes</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/createOrder"
            ><span id="opc">Añadir Pedido</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/createDeliveryman"
            ><span id="opc">Añadir Repartidor</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/listDeliveryman"
            ><span id="opc">Ver Repartidores</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/assignDelivery"
            ><span id="opc">Asignar Repartidores</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/reports"
            ><span id="opc">Reporte</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/pdfs"
            ><span id="opc">PDF</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/createUser"
            ><span id="opc">Registrar Usuario</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/downloadDelivery"
            ><span id="opc">Descargar Entregas</span></router-link
          >
        </li>
      </ul>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="logged" block @click="logout"> Salir </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app-bar>
</template>
<script>
export default {
  name: "navBar",
  data() {
    return {
      drawer2: false,
      logged: null,
    };
  },
  computed: {},
  mounted: async function () {
    if (
      sessionStorage.getItem("loged") == "false" ||
      sessionStorage.getItem("loged") == null
    ) {
      console.log("entre al false o null");
      this.logged = false;
    } else {
      console.log("entre al else");
      this.logged = true;
    }
  },
  methods: {
    logout: async function () {
      sessionStorage.clear();
      sessionStorage.setItem("loged", false);
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
<style scoped>
#opc {
  color: #ab166a;
}

a {
  text-decoration: none;
}
@media (max-width: 1024px) {
  .onlyMobile {
    display: inline-flex;
  }
  .onlyDesktop {
    display: none !important;
  }
}
@media (min-width: 1024px) {
  .onlyMobile {
    display: none !important;
  }
  .onlyDesktop {
    display: inline-flex;
  }
}
#drawerDiv button {
  margin-top: 0.3rem;
  background-color: rgb(14, 145, 140);
  color: white;
  text-align: left;
  font-family: Poiret One, sans-serif !important;
}
#drawerDiv {
  background-color: rgb(14, 145, 140);
}
.btn-class {
  font-size: 1rem;
  text-transform: capitalize;
  margin-top: 5rem !important;
  padding-bottom: 1.2rem;
  margin-right: 1rem;
  font-family: Poiret One, sans-serif !important;
}
.btn-classDrawer {
  font-size: 1rem;
  text-transform: capitalize;
  margin-top: 2rem !important;
}

@media screen and (max-width: 1230px) {
  #inicio {
    width: 8% !important;
  }
}

@media screen and (max-width: 1187px) {
  #CDCD {
    width: 9% !important;
  }
}

@media screen and (max-width: 1140px) {
  #paquetes {
    width: 22% !important;
  }

  #inicio {
    width: 8% !important;
  }

  #CDCD {
    width: 8% !important;
  }

  #inicio button {
    font-size: 0.8em;
  }

  #CDCD button {
    font-size: 0.8em;
  }

  #paquetes button {
    font-size: 0.8em;
  }

  #sesion button {
    font-size: 0.8em;
  }
}
</style>