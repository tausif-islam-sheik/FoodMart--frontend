/* eslint-disable @typescript-eslint/no-explicit-any */
const BACKEND_URL = typeof window !== "undefined" ? "" : process.env.BACKEND_URL!;

interface ProviderProfileData {
  id?: string;
  restaurantName: string;
  address: string;
  phone: string;
  logo?: string;
}

export const providerService = {
  getAllProviders: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();

      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getProviderById: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },


  createProviderProfile: async (payload: ProviderProfileData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: { message: data.message } };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateProviderProfile: async (
    id: string,
    payload: Partial<ProviderProfileData>,
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: { message: data.message } };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  deleteProviderProfile: async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      return data.success
        ? { data: true, error: null }
        : { data: null, error: { message: data.message } };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getProviderOrders: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/orders`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null, success: true }
        : { data: null, error: data.message || data.error, success: false };
    } catch (err: any) {
      return { data: null, error: err.message || "Something went wrong", success: false };
    }
  },
};
