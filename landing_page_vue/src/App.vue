<template>
  <the-header app-name="Noleggio Auto">
    <template #links>
      <the-header-navbar />
    </template>
  </the-header>
  <the-body></the-body>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheHeaderNavbar from './components/layout/TheHeaderNavbar.vue';
import TheBody from './components/layout/TheBody.vue'
import TheFooter from './components/layout/TheFooter.vue'

export default {
  components: {
    TheHeader, 
    TheHeaderNavbar,
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
  }
};
</script>

<style scoped></style>