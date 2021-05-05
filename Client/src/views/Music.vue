<template>
  <div class="Music" fill-height>
    <Navbar />
    <Musictable class="ma-8" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Musictable from "@/components/Musictable.vue";

export default {
  components: { Navbar, Musictable},
};
</script>
