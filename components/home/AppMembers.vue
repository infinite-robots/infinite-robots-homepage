<template>
  <section class="home-section">
    <div class="content members">
      <h2>Members</h2>
      <ul>
        <li v-for="member in members" :key="member">{{member}}</li>
      </ul>
      <p>Want to join the Infinite Robots? Just join our <a href="https://discord.gg/WdWARZA">discord</a> and open a pull request on <a href="https://github.com/infinite-robots/infinite-robots-homepage/edit/master/components/home/AppMembers.vue">github</a> to add yourself to the members list!</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      members: [
        'Drew W.',
        'Rian W.'
      ]
    }
  }
}
</script>

<style>

</style>
