<template>
  <the-header>

  </the-header>
  <the-body></the-body>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheBody from './components/layout/TheBody.vue'
import TheFooter from './components/layout/TheFooter.vue'

export default {
  components: {
    TheHeader, 
    TheBody, 
    TheFooter
  },
  data() {
    return {
      activeBodyComponent: null,

    };
  },
  methods: {
    changeActiveBodyComponent(component) {
      this.activeBodyComponent = component;
      console.log(`[LOG]: active body component => ${this.activeBodyComponent}`);
    } 
  },
  provide() {
    return {
      changeActiveBodyComponent: this.changeActiveBodyComponent,
      activeBodyComponent: this.activeBodyComponent,
    }
  }, 
  created() {
    
  }
};
</script>

<style lang="scss">

</style>