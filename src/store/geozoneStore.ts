import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CircleGeozone {
    id: string;
    name: string;
    type: 'circle';
    center: [number, number];
    radius: number;
    color: string;
}

interface PolygonGeozone {
    id: string;
    name: string;
    type: 'polygon';
    points: [number, number][];
    color: string;
}

interface LineGeozone {
    id: string;
    name: string;
    type: 'line';
    points: [number, number][];
    color: string;
}

export type Geozone = CircleGeozone | PolygonGeozone | LineGeozone;

interface GeozoneState {
    geozones: Geozone[];
    selectedId: string | null;
    isLoading: boolean;
    isSaving: boolean;
    addGeozone: (geozone: Geozone) => void;
    removeGeozone: (id: string) => void;
    updateGeozone: (id: string, updates: Partial<Geozone>) => void;
    clearGeozones: () => void;
    select: (id: string | null) => void;
    loadGeozones: () => Promise<void>;
    saveGeozones: () => Promise<void>;
}

export const useGeozoneStore = create<GeozoneState>()(
    persist(
        (set, get) => ({
            geozones: [],
            selectedId: null,
            isLoading: false,
            isSaving: false,

            addGeozone: (geozone) => {
                set((state) => ({
                    geozones: [...state.geozones, geozone]
                }));
                setTimeout(() => {
                    get().saveGeozones();
                }, 0);
            },

            removeGeozone: (id) => {
                set((state) => ({
                    geozones: state.geozones.filter((z) => z.id !== id),
                    selectedId: state.selectedId === id ? null : state.selectedId
                }));
                setTimeout(() => {
                    get().saveGeozones();
                }, 0);
            },

            updateGeozone: (id, updates) => {
                set((state) => ({
                    geozones: state.geozones.map((z) =>
                        z.id === id ? { ...z, ...updates } as Geozone : z
                    )
                }));
                setTimeout(() => {
                    get().saveGeozones();
                }, 0);
            },

            clearGeozones: () => {
                set({ geozones: [], selectedId: null });
                setTimeout(() => {
                    get().saveGeozones();
                }, 0);
            },

            select: (id) => set({ selectedId: id }),

            loadGeozones: async () => {
                if (typeof window === 'undefined') return;

                if (!window.storage) {
                    console.log('Storage API not available');
                    return;
                }

                set({ isLoading: true });

                try {
                    const result = await window.storage.get('geozones');
                    if (result && result.value) {
                        const geozones = JSON.parse(result.value) as Geozone[];
                        set({ geozones, isLoading: false });
                        console.log('Geozones loaded successfully:', geozones.length);
                    } else {
                        set({ isLoading: false });
                        console.log('No saved geozones found');
                    }
                } catch (error) {
                    console.log('Error loading geozones:', error);
                    set({ isLoading: false });
                }
            },

            saveGeozones: async () => {
                if (typeof window === 'undefined') return;

                if (!window.storage) {
                    console.log('Storage API not available, using localStorage only');
                    return;
                }

                set({ isSaving: true });

                try {
                    const { geozones } = get();
                    const result = await window.storage.set('geozones', JSON.stringify(geozones));

                    if (result) {
                        console.log('Geozones saved successfully:', geozones.length);
                    } else {
                        console.error('Failed to save geozones');
                    }

                    set({ isSaving: false });
                } catch (error) {
                    console.error('Error saving geozones:', error);
                    set({ isSaving: false });
                }
            },
        }),
        {
            name: 'geozone-storage',
            onRehydrateStorage: () => (state) => {
                if (state && typeof window !== 'undefined') {
                    state.loadGeozones().catch(err => {
                        console.log('Could not load from server storage:', err);
                    });
                }
            },
        }
    )
);