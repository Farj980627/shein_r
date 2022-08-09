
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    
    theme: {
        primary: "#7F8EAD",
        secondary:"#D2D3C9",
        naranja: "#f6830f",
        rojo: "#BB2205"
      },
      options: {
        customProperties: true
      }
    
    
});