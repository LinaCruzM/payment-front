import axios from 'axios'
import { defineStore } from 'pinia';
// import { ref } from 'vue'
// import CryptoJS from 'crypto-js'
// import { showSwalAlert } from "../validations.js"

export const useAuthStore = defineStore('person', () => {
  const URL_LOGIN = 'http://127.0.0.1:8000/api/login'
  // const per_id = ref()
  // const authPerson = ref(null)

  const access = async (per_mail, per_password) => {
    try {
      // const hashedPassword = CryptoJS.SHA256(per_password).toString()
      const res = await axios.post(URL_LOGIN, {
        per_mail: per_mail,
        per_password: per_password
      }, {
        withCredentials: true // Asegura que se envíen credenciales con la solicitud
      })

      // const secretKey = 'TuClaveSecreta'
      // per_id.value = res.data.data.per_id
      // authPerson.value = res.data.data

      // const encryptedId = CryptoJS.AES.encrypt(String(per_id.value), secretKey).toString()
      // localStorage.setItem('id', encryptedId)
      // localStorage.setItem('pass', hashedPassword)
      console.log(res.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        // let messageToShow = error.response.data.message
        // if (messageToShow.includes('Invalid email')) {
        //   messageToShow =
        //     'Hubo un problema con tu inicio de sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.'
        //   showSwalAlert(null, messageToShow, 'error')
        // } else if (messageToShow.includes('no access')) {
        //   messageToShow =
        //     'Acceso denegado: No tienes permiso para acceder a este recurso. Por favor, contacta al administrador para obtener ayuda.'
        //   showSwalAlert(null, messageToShow, 'warning')
        // } else if (messageToShow.includes('login does not exist')) {
        //   messageToShow = 'el usuario no existe'
        //   showSwalAlert(null, messageToShow, 'warning')
        // } else {
        //   showSwalAlert(null, messageToShow, 'error')
        // }
      } else if (error.request) {
        console.error('Error de solicitud:', error.request)
      } else {
        console.error('Error inesperado:', error.message)
      }
    }
  }

  return {
    access
  }
});
