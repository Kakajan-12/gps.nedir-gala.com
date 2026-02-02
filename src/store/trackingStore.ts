import { create } from 'zustand';

export type TrackPoint = {
    lat: number;
    lng: number;
    speed: number;
    course: number;
    timestamp: string;
};

type State = {
    equipmentId: string | null;
    from: string;
    to: string;
    points: TrackPoint[];
    currentIndex: number;
    playing: boolean;

    setEquipment: (id: string) => void;
    setFrom: (v: string) => void;
    setTo: (v: string) => void;
    setPoints: (p: TrackPoint[]) => void;

    play: () => void;
    pause: () => void;
    next: () => void;
};

export const useTrackingStore = create<State>((set, get) => ({
    equipmentId: null,
    from: '',
    to: '',
    points: [],
    currentIndex: 0,
    playing: false,

    setEquipment: (id) => set({ equipmentId: id }),
    setFrom: (v) => set({ from: v }),
    setTo: (v) => set({ to: v }),
    setPoints: (points) => set({ points, currentIndex: 0 }),

    play: () => set({ playing: true }),
    pause: () => set({ playing: false }),

    next: () => {
        const { currentIndex, points } = get();
        if (currentIndex < points.length - 1) {
            set({ currentIndex: currentIndex + 1 });
        }
    },
}));
