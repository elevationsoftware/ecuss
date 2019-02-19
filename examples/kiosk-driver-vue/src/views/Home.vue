<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to The Vue.js Elevated Kiosk Driver Demo"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import cuss from '@elevated-libs/ecuss';

@Component({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
	private created() {
		cuss.init();
		// cuss.startSDK();
	}
}
</script>
