<template>
  <div class="container">
    <LoginView />
  </div>
</template>

<script>
import LoginView from '../src/views/LoginView.vue';

export default {
  name: 'App',
  components: {
    LoginView
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

*, 
*::after, 
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

</style>
