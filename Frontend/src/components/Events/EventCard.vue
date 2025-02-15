<!-- src/components/Event/EventCard.vue -->
<script setup lang="ts">
interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  authorImage: string;
  timeAgo: string;
}

const props = defineProps<{ event: Event }>();
</script>

<template>
  <div class="justify-center items-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
      <!-- <img :src="event.imageUrl" alt="Event" class="w-full h-64 object-cover"> -->
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ event.title }}</h2>
        <h1 class="text-md font-bold text-gray-600 mb-2">{{ event.date }}</h1>
        <p class="text-gray-700 leading-tight mb-4">{{ event.description }}</p>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span class="text-gray-800 font-semibold">
                <!-- {{ event.author }} -->
              {{ event.userId }}
            </span>
          </div>
          <span class="text-gray-600">{{ event.timeAgo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
