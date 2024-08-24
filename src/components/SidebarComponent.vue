<template>
    <div :class="['sidebar', { active: isActive }]">
      <div class="top">
        <div class="logo">
          <img src="../assets/logo-sidebar.png" alt="">
        </div>
        <i :class="btnIconClass" @click="toggleSidebar" id="btn"></i>
      </div>
      <div class="user">
        <i class="bi bi-person-circle"></i>
        <div>
          <p class="bold">Nombree</p>
          <p>Admin</p>
        </div>
      </div>
      <ul v-for="(item, index) in menuItems" :key="index">
        <li>
          <a href="#">
            <i :class="getIconClass(item.icon)" id="icons"></i>
            <span class="nav-item">{{ item.label }}</span>
          </a>
          <span class="tooltip">{{ item.tooltip }}</span>
        </li>
      </ul>
      <ul class="log-out">
        <li>
          <a href="#">
            <i class="bi-box-arrow-left"></i>
            <span class="nav-item">Cerrar sesión</span>
          </a>
          <span class="tooltip">Cerrar sesión</span>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <div class="container">
        <h1>Titulo</h1>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const isActive = ref(false);
  
  const toggleSidebar = () => {
    isActive.value = !isActive.value;
  };
  
  const menuItems = ref([
    { label: 'Solicitudes', tooltip: 'Solicitudes', icon: 'bi-chat-square-dots'},
    { label: 'Notificaciones', tooltip: 'Notificaciones', icon: 'bi-bell' },
    { label: 'Usuarios', tooltip: 'Usuarios', icon: 'bi-people' },
    { label: 'Áreas', tooltip: 'Áreas', icon: 'bi-grid-1x2' },
    { label: 'Roles', tooltip: 'Roles', icon: 'bi-suitcase-lg' },
    { label: 'Tipo de compras', tooltip: 'Tipo compras', icon: 'bi-basket3' },
    { label: 'Proveedores', tooltip: 'Proveedores', icon: 'bi-truck' }
  ]);
  
  const btnIconClass = computed(() => isActive.value ? 'bi bi-x' : 'bi bi-list');
  
  const getIconClass = (icon) => {
    return isActive.value ? `${icon}` : icon;
  };
  </script>
  
  <style scoped>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 6%;
    background-color: #033e8c;
    padding: .4rem .8rem;
    transition: all .5s ease;
    text-align: center;
    align-items: center;
  }
  
  .sidebar.active ~ .main-content {
    left: 250px;
    width: calc(100% - 250px);
  }
  
  .sidebar.active {
    width: 250px;
  }
  
  .sidebar #btn {
    position: absolute;
    color: white;
    top: .4rem;
    left: 50%;
    font-size: 1.2rem;
    line-height: 50px;
    transform: translateX(-50%);
    cursor: pointer;
  }
  
  .user i{
    font-size: 2rem;
    margin-left: 10px;
    color: white;
  }
  
  .sidebar.active #btn {
    left: 90%;
  }
  
  .sidebar .top .logo {
    color: white;
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    pointer-events: none;
    opacity: 0;
  }
  
  .sidebar.active .top .logo {
    opacity: 1;
  }
  
  .top .logo img {
    height: 2.5rem;
    margin-left: 10px;
    margin-right: 1rem;
  }
  
  .user {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
  
  .user p {
    color: white;
    opacity: 1;
    margin-left: 1rem; 
  }
  
  .bold {
    font-weight: 600;
  }
  
  .sidebar p {
    opacity: 0;
  }
  
  .sidebar.active p {
    opacity: 1;
  }
  
  .sidebar ul li {
    position: relative;
    list-style-type: none;
    height: 45px;
    width: 100%;
    justify-content: flex-start;
    line-height: 45px; 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom:.3rem;
  }
  
  .sidebar ul li a {
    height: 100%;
    width: 100%; 
    display: flex;
    color: white;
    align-items: center;
    text-decoration: none;
    border-radius: .8rem;
    height: 100%;
  }
  
  .sidebar ul li a:hover {
    background-color: white;
    color: black;
  }
  
  .sidebar ul li a i {
    width: 30px;
    height: 30px;
    text-align: center;
    margin-left: .9rem;
    font-size: 1.3rem;
    line-height: 30px;
  }
  
  .sidebar.active ul li a i{
    margin-left: .7rem;
    margin-right: 1rem;
  }
  
  .sidebar .nav-item {
    opacity: 0;
  }
  
  .sidebar.active .nav-item {
    opacity: 1;
  }
  
  .sidebar ul li .tooltip {
    position: absolute;
    left: 150px;
    width: 150px;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 .5rem .8rem rgba(0, 0, 0, 0.244);
    border-radius: .6rem;
    padding: .4rem 1.2rem;
    line-height: 1.8rem;
    z-index: 20;
    opacity: 0;
  }
  
  .sidebar ul li:hover .tooltip {
    opacity: 1;
  }
  
  .sidebar.active ul li .tooltip {
    display: none;
  }
  
  .main-content {
    position: relative;
    height: 100vh;
    top: 0;
    left: 80px;
    transition: all .5s ease;
    width: calc(100% - 80px);
    padding: 1rem;
  }
  
  </style>
  