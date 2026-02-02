export type GeozoneType = 'circle' | 'polygon';

export interface Geozone {
    id: string;
    name: string;
    type: GeozoneType;
    color: string;
    active: boolean;

    // circle
    center?: [number, number];
    radius?: number;

    // polygon
    points?: [number, number][];
}
