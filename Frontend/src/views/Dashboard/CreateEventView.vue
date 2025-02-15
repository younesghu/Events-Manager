<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import InputGroup from '@/components/Auths/InputGroup.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const eventStore = useEventStore();
const router = useRouter();

const event = ref({
  title: "",
  description: "",
  date: new Date().toISOString(),
  location: "",
  max_participants: 0,
});

const handleSubmit = async (formEvent: Event) => {
  formEvent.preventDefault();
  try {
    await eventStore.createEvent(event.value);
    router.push({ name: 'home' });

  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <DefaultLayout>
    <div class="w-full bg-gray-50 dark:bg-gray-700 p-4">
      <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 text-center">
        Create Event
      </h1>
      <form @submit="handleSubmit">
        <div class="p-6.5">
          <InputGroup v-model="event.title" label="Title" type="text" placeholder="Enter your Event Title" customClasses="w-full xl:w-1/2" name="title" />
          <InputGroup v-model="event.date" label="Date" type="date" placeholder="Enter your Event Date" customClasses="mb-4.5" name="date" required />
          <InputGroup v-model="event.location" label="Location" type="text" placeholder="Enter your Event Location" customClasses="mb-4.5" name="location" />
          <InputGroup v-model="event.max_participants" label="Max Participants" type="number" placeholder="Enter your Event Max Participants" customClasses="mb-4.5" name="max_participants" />

          <div class="mb-6">
            <label class="mb-2.5 block text-black dark:text-white">Description</label>
            <textarea v-model="event.description" rows="6" placeholder="Type your Event Description" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" name="description"></textarea>
          </div>

          <button type="submit" class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Create Event
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>
