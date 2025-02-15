<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventService from '@/services/api/event';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();
const event = ref(null);
const eventId = Number(route.params.id);

const isJoining = ref(false);
const requestStatus = ref('');

onMounted(async () => {
  try {
    const response = await EventService.getEventById(Number(eventId));
    console.log("API Response:", response);
    event.value = response.data.data.item; 
  } catch (error) {
    console.error('Error fetching event:', error);
  }
});
const requestEntrance = async () => {
  isJoining.value = true;
  try {
    const response = await EventService.requestEntrance(eventId);
    console.log("Entrance Request Response:", response);
    requestStatus.value = "Request sent successfully!";
  } catch (error) {
    console.error('Error sending request:', error);
    requestStatus.value = "Failed to send request!";
  } finally {
    isJoining.value = false;
  }
};
</script>

<template>
  <DefaultLayout>
    <div class="flex justify-center items-center bg-gray-100 p-6">
      <div v-if="event" class="bg-white shadow-lg rounded-lg p-6 w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ event.title }}</h1>
        <p class="text-gray-600 text-lg mb-4">{{ event.description }}</p>
        
        <div class="grid grid-cols-2 gap-4">
          <p class="text-gray-700"><strong class="font-semibold">📍 Location:</strong> {{ event.location }}</p>
          <p class="text-gray-700"><strong class="font-semibold">👥 Max Participants:</strong> {{ event.maxParticipants }}</p>
          <p class="text-gray-700"><strong class="font-semibold">📅 Date:</strong> {{ event.date }}</p>
          <p class="text-gray-700"><strong class="font-semibold">🔵 Status:</strong> {{ event.active ? "Active" : "Inactive" }}</p>
        </div>
  
        <button 
          @click="requestEntrance"
          :disabled="isJoining"
          class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {{ isJoining ? "Requesting..." : "Join Event" }}
        </button>
  
        <p v-if="requestStatus" class="mt-4 text-center font-semibold" 
           :class="requestStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'">
          {{ requestStatus }}
        </p>
      </div>
  
      <div v-else class="text-center text-gray-500 text-lg">
        <p>Loading event details...</p>
      </div>
    </div>
  </DefaultLayout>
  </template>