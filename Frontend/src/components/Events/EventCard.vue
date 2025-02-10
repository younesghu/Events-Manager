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
      <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ event.title }}</h2>
        <p class="text-gray-700 leading-tight mb-4">{{ event.description }}</p>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <!-- <img :src="event.authorImage" alt="Avatar" class="w-8 h-8 rounded-full mr-2 object-cover"> -->
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Avatar" class="w-8 h-8 rounded-full mr-2 object-cover">
            <span class="text-gray-800 font-semibold">
              <!-- {{ event.author }} -->
              Author Name
            </span>
          </div>
          <span class="text-gray-600">{{ event.timeAgo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
