<template>
  <the-header
    app-name="Noleggio Auto"
    :links="headerLinks"
    >
  </the-header>
  <the-body></the-body>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheBody from './components/layout/TheBody.vue'
import TheFooter from './components/layout/TheFooter.vue'

import TheHeaderLink from './classes/layout/TheHeaderLink.js'

export default {
  components: {
    TheHeader, 
    TheBody, 
    TheFooter
  },
  data() {
    return {
      headerLinks: [
        new TheHeaderLink('features', '#', 'Features'),
        new TheHeaderLink('pricing', '#', 'Pricing'),
        new TheHeaderLink('google', 'https://www.google.com', 'Google'),
        new TheHeaderLink('about_us', '#', 'About us')
      ]
    };
  },
  props: {},
  methods: {},
};
</script>

<style scoped></style>