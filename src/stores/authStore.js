import axios from 'axios'
import { defineStore } from 'pinia';
// import CryptoJS from 'crypto-js'
// import { showSwalAlert } from "../validations.js"

export const useAuthStore = defineStore('person', () => {
  const URL_LOGIN = 'http://127.0.0.1:8000/api/login'

  const access = async (per_mail, per_password) => {
    try {
      const res = await axios.post(URL_LOGIN, {
        per_mail: per_mail,
        per_password: per_password
      }, {
        withCredentials: true
      })
      console.log(res.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response)
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
