<template>
  <section id="home">
    <app-intro></app-intro>
    <app-about></app-about>
    <app-news></app-news>
    <app-discord></app-discord>
    <app-meetup></app-meetup>
    <app-members></app-members>
    <app-projects></app-projects>
  </section>
</template>

<script>
import { AppIntro, AppNews, AppAbout, AppDiscord, AppMeetup, AppMembers, AppProjects } from '~/components/home';

export default {
  components: {
    AppIntro, AppNews, AppAbout, AppDiscord, AppMeetup, AppMembers, AppProjects
  }
}
</script>

<style>

</style>
