import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
  max_participants: number;
}

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [] as EventData[],
  }),
  actions: {
    async createEvent(eventData: EventData) {
      const authStore = useAuthStore();
      const user = authStore.user;
      if (!authStore.isAuthenticated || !authStore.user) {
        throw new Error("User not authenticated");
      }

      const eventPayload = {
        user_id: user?.id,
        ...eventData,
        date: eventData.date.replace("T", " ").split(".")[0], // Converts "2025-02-06T15:30:00.000Z" -> "2025-02-06 15:30:00"
        active: false,
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore.token}`,
          },
          body: JSON.stringify(eventPayload),
        });

        const data = await response.json();
        if (response.ok) {
          this.events.push(data);
          return data;
        } else {
          throw new Error(data.message || "Failed to create event");
        }
      } catch (error) {
        console.error("Error creating event:", error);
        throw error;
      }
    },
  },
});
