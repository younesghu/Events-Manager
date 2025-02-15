<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      await authStore.fetchUserDetails();
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  }
});
</script>

<template>
  <RouterView />
</template>
