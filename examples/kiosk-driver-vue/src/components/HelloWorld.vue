<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>BUCKLE UP!</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
	@Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  color: #0faded;
  font-weight: bold;
  font-size: 2rem;
}
</style>
