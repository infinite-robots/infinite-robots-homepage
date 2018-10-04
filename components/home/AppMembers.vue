<template>
  <section class="home-section">
    <div class="content members">
      <h2>Members</h2>
      <ul>
        <li v-for="member in members" :key="member">{{member}}</li>
      </ul>
      <p>Want to join the Infinite Robots? Just join our discord and open a pull request on github to add yourself to the members list!</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      members: [
        'drew',
        'cadeng150'
      ]
    }
  }
}
</script>

<style>

</style>
