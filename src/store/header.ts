import {create} from 'zustand';

export const headerStore = create((set) => ({
    activeTabName: '',
    setActiveTabName: (newActiveName: string) => set((state: any) => ({
        activeTab: newActiveName,
    })),
    reset: () => {
        set({activeTab: ''});
    },
}))