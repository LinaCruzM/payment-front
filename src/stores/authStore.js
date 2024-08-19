import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
    password: '',
    activeField: null,
    showPassword: false,
    emailIsValid: true,
    passwordIsValid: true,
    showModal: false,
  }),
  actions: {
    activateField(field) {
      this.activeField = field;
    },
    deactivateField(field) {
      if ((!this.email && field === 'email') || (!this.password && field === 'password')) {
        this.activeField = null;
      }
    },
    isActive(field) {
      return this.activeField === field;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailIsValid = emailPattern.test(this.email);
    },
    validatePassword() {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
      this.passwordIsValid = passwordPattern.test(this.password);
    },
    submitForm() {
      this.validateEmail();
      this.validatePassword();

      if (this.emailIsValid && this.passwordIsValid) {
        const encryptedPassword = CryptoJS.AES.encrypt(this.password, 'your-secret-key').toString();
        console.log('Formulario válido');
        console.log('Email:', this.email);
        console.log('Contraseña:', this.password);
        console.log('Contraseña encriptada:', encryptedPassword);
      } else {
        this.showModal = true;
      }
    },
  },
});
