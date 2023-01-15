<template>
  <!-- TODO: Aggiungere un piccolo riquadro per il prezzo e accettare le caratteristiche 
  della macchina -->
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
div {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding-bottom: 1rem;
  margin: 2rem auto;
  background-color: black;

  &:hover {
    background-color: #2c1a4d;
    cursor: pointer;
  }
}
</style>
