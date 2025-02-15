<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EventService from '@/services/api/event';

const eventRequests = ref([]);

onMounted(async () => {
  try {
    const response = await EventService.getEventRequests();
    eventRequests.value = response.data.data;
  } catch (error) {
    console.error('Error fetching event requests:', error);
  }
});

const updateApprovalStatus = async (eventTitle: number, userId: number, status: number) => {
  try {
    await EventService.approveEntrance(eventTitle, userId, status);

    // Update UI locally
    const request = eventRequests.value.find(req => req.id === eventTitle && req.userId === userId);
    if (request) {
      request.isApproved = status;
    }
  } catch (error) {
    console.error('Error updating approval status:', error);
  }
};
</script>

<template>
  <DefaultLayout>
    <div class="flex justify-center items-center bg-gray-100 p-6">
      <div class="bg-white shadow-lg rounded-lg p-6 w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Event Requests</h1>

        <div v-if="eventRequests.length">
          <table class="w-full border-collapse border border-gray-300">
            <thead class="bg-gray-200">
              <tr>
                <th class="border p-3 text-left">ID</th>
                <th class="border p-3 text-left">User ID</th>
                <th class="border p-3 text-left">Event Name</th>
                <th class="border p-3 text-left">Approval Status</th>
                <th class="border p-3 text-left">Created At</th>
                <th class="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in eventRequests" :key="request.id" class="border">
                <td class="p-3">{{ request.id }}</td>
                <td class="p-3">{{ request.userId }}</td>
                <td class="p-3">{{ request.eventTitle }}</td>
                <td class="p-3">
                  <span 
                    :class="request.isApproved ? 'text-green-600' : 'text-red-600'"
                    class="font-bold"
                  >
                    {{ request.isApproved ? 'Approved' : 'Pending' }}
                  </span>
                </td>
                <td class="p-3">{{ new Date(request.createdAt).toLocaleString() }}</td>
                <td class="p-3 flex justify-center gap-3">
                <template v-if="!request.isApproved">
                    <button 
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    @click="updateApprovalStatus(request.eventTitle, request.userId, 1)"
                    >
                    Approve
                    </button>

                    <button 
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    @click="updateApprovalStatus(request.eventTitle, request.userId, 0)"
                    >
                    Disapprove
                    </button>
                </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="text-gray-500 text-center">No event requests found.</p>
      </div>
    </div>
  </DefaultLayout>
</template>