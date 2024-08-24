<!-- <template>
  <div class="main">
    <div class="box">
      <div class="inner-box">
        <div class="img"></div>
        <div class="forms-wrap">
          <form @submit.prevent="submitForm" class="login-form">
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
                <input type="text" class="input-field" v-model="per_mail" 
                  :class="{ active: isActive('per_mail') || per_mail.length > 0 }" 
                  @focus="activateField('per_mail')" @blur="deactivateField('per_mail')" required>
                <label class="label" :class="{ 'has-content': per_mail.length > 0 }">
                  Correo electrónico
                </label>
              </div>
              <div class="input-wrap">
                <input class="input-field" v-model="per_password" :type="showPassword ? 'text' : 'password'"
                  :class="{ active: isActive('per_password') || per_password.length > 0 }" 
                  @focus="activateField('per_password')" @blur="deactivateField('per_password')" required>
                <label class="label" :class="{ 'has-content': per_password.length > 0 }">
                  Contraseña
                </label>
                <i class="bi eye-btn" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'" @click="togglePasswordVisibility"></i>
              </div>
              <input type="submit" class="login-btn" value="Inicia sesión" @click="redirectToLogin">
            </div>
          </form>
        </div>
      </div>
    </div>
    <ModalComponent :show="showModal" @close="showModal = false">
      <img class="modal-img" src="@/assets/error.png" alt="Logo inmarket">
      <h1 class="modal-title">¡Datos invalidos!</h1>
      <div class="error-msg" v-if="!emailIsValid">Correo electrónico no válido</div>
      <div class="error-msg" v-if="!passwordIsValid">La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, un número y un carácter especial</div>
    </ModalComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa useRouter
import { useAuthStore } from '@/stores/authStore.js';
import CryptoJS from 'crypto-js';
import ModalComponent from '@/components/ModalComponent.vue';

// Configura el enrutador
const router = useRouter();
const authStore = useAuthStore();

const per_mail = ref('');
const per_password = ref('');
const showPassword = ref(false);
const activeField = ref(null);
const emailIsValid = ref(true);
const passwordIsValid = ref(true);
const showModal = ref(false);

const activateField = (field) => {
  activeField.value = field;
};

const deactivateField = (field) => {
  if (!per_mail.value && field === 'per_mail' || !per_password.value && field === 'per_password') {
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
  emailIsValid.value = emailPattern.test(per_mail.value);
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
  passwordIsValid.value = passwordPattern.test(per_password.value);
};

const submitForm = async () => {
  validateEmail();
  validatePassword();

  if (emailIsValid.value && passwordIsValid.value) {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(per_password.value, 'your-secret-key').toString();

      await authStore.access(per_mail.value, encryptedPassword);

      // Redirige a la página de inicio después de una autenticación exitosa
      router.replace('/users');

      console.log('Formulario válido');
      console.log('Email:', per_mail.value);
      console.log('Contraseña:', per_password.value);
      console.log('Contraseña encriptada:', encryptedPassword);
      
    } catch (error) {
      console.error('Error durante el acceso:', error);
      showModal.value = true;
    }
  } else {
    showModal.value = true;
  }
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

.actual-form {
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

.login-btn:hover {
  background-color: #049DD9;
}

.eye-btn {
  height: 20px;
  margin-left: -20px;
  padding: 0;
  color: #929292;
  cursor: pointer;
}

.modal-img{
  margin: 0;
  height: 105px;
}

.modal-title{
  margin: 10px 0;
  color: #000a24;
}

.error-msg{
  text-align: center;
  margin: 5px 0;
}
</style> -->
