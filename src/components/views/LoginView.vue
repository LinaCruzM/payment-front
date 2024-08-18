<template>
  <div class="main">
    <div class="box">
      <div class="inner-box">
        <div class="img">

        </div>
        <div class="forms-wrap">
          <form @submit.prevent="login" class="login-form">
            <div class="logo">
              <img src="@/assets/logo.png" alt="Logo inmarket">
            </div>
            <div class="heading">
              <h2>Inicia sesión</h2>
              <h6>¿Olvidaste tu contraseña?</h6>
              <a href="#" class="toggle">¡Restablécela!</a>
            </div>
            <div class="actual-form">
              <div class="input-wrap">
                <input type="text" class="input-field" v-model="email" 
                :class="{ active: isActive('email') || email.length > 0 }" @focus="activateField('email')" 
                  @blur="deactivateField('email')" required>
                <span v-if="!emailIsValid">Correo electrónico no válido</span>
                <label class="label" :class="{ 'has-content': email.length > 0 }">
                  Correo electrónico
                </label>
              </div>
              <div class="input-wrap">
                  <input class="input-field" v-model="password" :type="showPassword ? 'text' : 'password'"
                  :class="{ active: isActive('password') || password.length > 0 }" @focus="activateField('password')" 
                  @blur="deactivateField('password')" required>
                  <span v-if="!passwordIsValid">La contraseña debe tener al menos 8 caracteres</span>
                  <label class="label" :class="{ 'has-content': password.length > 0 }">
                    Contraseña
                  </label>
                    <i class="bi eye-btn" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'" @click="togglePasswordVisibility"></i>
              </div>
              <input type="submit" class="login-btn" value="Inicia sesión">
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  name: 'HomeView',
  setup() {
    const email = ref('');
    const password = ref('');
    const activeField = ref(null);
    const showPassword = ref(false);
    const emailIsValid = ref(true);
    const passwordIsValid = ref(true);

    const login = () => {
      console.log(email.value);
      console.log(password.value);
    };

    const activateField = (field) => {
      activeField.value = field;
    };

    const deactivateField = (field) => {
      if (!email.value && field === 'email' || !password.value && field === 'password') {
        activeField.value = null;
      }
    };

    const isActive = (field) => {
      return activeField.value === field;
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailIsValid.value = emailPattern.test(email.value);
    };

    const validatePassword = () => {
      passwordIsValid.value = password.value.length >= 8;
    };

    const submitForm = () => {
      validateEmail();
      validatePassword();

      if (emailIsValid.value && passwordIsValid.value) {
        console.log('Formulario válido');
      }
    };

    return {
      email,
      password,
      activeField,
      showPassword,
      emailIsValid,
      passwordIsValid,
      login,
      activateField,
      deactivateField,
      isActive,
      togglePasswordVisibility,
      validateEmail,
      validatePassword,
      submitForm,
    };
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/fondo-login.png");
  background-size: cover;
  padding: 2rem 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  position: relative;
  width: 100%;
  height: 83vh;
  background-color: whitesmoke;
  border-radius: 1rem;
  box-shadow: 0px 0px 22px -6px rgba(0,0,0,0.52);
  display: flex; 
  align-items: center; 
  justify-content: center;
}

.inner-box {
  position: absolute;
  width: calc(100% - 4.5rem);
  height: calc(100% - 4.5rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.img {
  position: absolute;
  height: 100%;
  width: 40%;
  top: 0;
  left: 0;
  background-image: url("@/assets/sidenav.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top 50%;
  border-radius: 1rem;
}

.forms-wrap {
  position: absolute;
  height: 100%;
  width: 60%;
  top: 0;
  left: 40%;
  text-align: center;
}

.actual-form{
  width: 80%;
}

.login-form {
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  width: 170px;
}

.heading h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #001324;
}

.heading h6 {
  color: #929292;
  font-weight: 400;
  font-size: .9rem;
  margin-bottom: 1rem;
  display: inline;
  margin-right: .2rem;
}

.toggle {
  color: #023059;
  text-decoration: none;
  font-size: .9rem;
  font-weight: 500;
  transition: 0.3s;
}

.toggle:hover {
  color: #049DD9;
}

.input-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  margin-bottom: 2rem;
  margin-top: .8rem;
  position: relative;
}

.input-field {
  width: 80%;
  height: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid #929292;
  background: none;
  font-size: 0.95rem;
  color: #151111;
  padding: 0;
  transition: .4s;
}

.label {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  color: #929292;
  pointer-events: none;
  transition: 0.4s;
}

.input-field.active + .label,
.input-field.has-content + .label {
  font-size: .75rem;
  top: -10px;
}

.input-field.active,
.input-field.has-content {
  border-bottom: 2px solid #049DD9;
}

.login-btn {
  display: inline-block;
  width: 80%;
  height: 43px;
  background-color: #033E8C;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: .9rem;
  transition: 0.3s;
  }

.login-btn:hover{
  background-color: #049DD9;
}

.eye-btn{
  height: 20px;
  margin-left: -20px;
  padding: 0;
  color: #929292;
  cursor: pointer;
}

</style>