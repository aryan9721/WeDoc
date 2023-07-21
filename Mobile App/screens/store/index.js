import { create } from 'zustand';

const useApiKeyStore = create((set) => ({
  apiKey: null,
  setApiKey: (apiKey) => set({ apiKey }),
}));

export default useApiKeyStore;
