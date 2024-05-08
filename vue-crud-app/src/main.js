import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import { io } from 'socket.io-client';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3003',
});

// Establish Socket.io connection
const socket = io('http://localhost:3003', {
  transports: ['websocket'],
});

Vue.prototype.$socket = socket;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
