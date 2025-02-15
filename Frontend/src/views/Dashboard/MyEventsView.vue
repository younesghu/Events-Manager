<!-- src/views/HomeView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EventCard from '@/components/Events/EventCard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EventService from '@/services/api/event';

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  authorImage: string;
  timeAgo: string;
}

const events = ref<Event[]>([]);

onMounted(async () => {
  try {
    const response = await EventService.getAllEventsMe();
    events.value = response.data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <router-link
        v-for="event in events"
        :key="event.id"
        :to="{ name: 'event-details', params: { id: event.id } }" 
      >
        <EventCard :event="event" />
      </router-link>
    </div>
  </DefaultLayout>
</template>
