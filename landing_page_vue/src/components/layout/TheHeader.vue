<template>
<nav class="navbar navbar-dark bg-dark navbar-expand-lg">
  <div class="container-fluid">
    <!-- a.main da dei bug grafici sui telefoni -->
    <a
      href="#"
      class="navbar-brand h1 mb-0 px-4 main me-5"
      > {{appName}}
    </a> 
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
      >      
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto px-5">
        <slot name="links">
          <a
            v-for="link in links"
            :key="link.key"
            :href="link.href"
            class="nav-link mx-3"
            > 
            {{link.text}}
          </a>
        </slot>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import TheHeaderLink from '../../classes/layout/TheHeaderLink';
import {isIterable} from '../../utilities/booleans'

export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {
    "appName": {
      type: String,
      required: true
    }, 
    "links": {
      required: false,
      validator(item) {
        return isIterable(item) && item.every(link => link instanceof TheHeaderLink)
      } 
    }
  },
  methods: {},
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Diplomata+SC&display=swap');

  nav.navbar * {
    font-size: calc(1.4rem + 1vh);
    
  }

  a.main {
    font-family: 'Diplomata SC';
  }
</style>