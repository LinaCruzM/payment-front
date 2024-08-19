<template>
    <div v-if="show" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
            <button class="close-btn" @click="closeModal">&times;</button>
            <hr class="modal-hr">
            <div class="modal-body">
            <slot></slot>
            </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalComponent',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    emits: ['close'],
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
<style scoped>
.modal-overlay {
    padding: 8%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
  
.modal-content {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 500px;
    width: 100%;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: gray;
}
.modal-hr{
    position: absolute;
    top: 45px;
    left: 10px;
    width: 95%;
    color: gray;
}

.modal-body{
    margin-top: 40px;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modal-img{
    height: 80px;
}
  </style>
  