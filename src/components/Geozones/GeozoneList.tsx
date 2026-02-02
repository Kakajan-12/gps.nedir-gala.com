'use client';

import { useState } from 'react';
import { useGeozoneStore } from '@/src/store/geozoneStore';
import { Trash2, Save, Loader2 } from 'lucide-react';
import Modal from './Modal';
import {useTranslations} from "next-intl";

export default function GeozoneList() {
    const t =useTranslations('Geozones')
    const { geozones, selectedId, select, removeGeozone, isSaving, saveGeozones } = useGeozoneStore();
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: string | null }>({
        show: false,
        id: null,
    });

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDeleteModal({ show: true, id });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.id) {
            removeGeozone(deleteModal.id);
        }
        setDeleteModal({ show: false, id: null });
    };

    const handleManualSave = () => {
        if (typeof saveGeozones === 'function') {
            saveGeozones();
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">{t('geofences')}</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {geozones.length} {geozones.length === 1 ? `${t('zone')}` : `${t('zones')}`}
                        </span>
                        <button
                            onClick={handleManualSave}
                            disabled={isSaving}
                            className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                            title={t('save')}
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                            ) : (
                                <Save className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {geozones.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <p>{t('no-zones')}</p>
                        <p className="text-sm mt-2">{t('add-new-geozone')}</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {geozones.map((z) => (
                            <div
                                key={z.id}
                                onClick={() => select(z.id)}
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                    selectedId === z.id
                                        ? 'bg-green-50 border-green-500 shadow-sm'
                                        : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800">
                                        {z.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                            style={{ background: z.color }}
                                        />
                                        <button
                                            onClick={(e) => handleDeleteClick(e, z.id)}
                                            className="p-1 hover:bg-red-100 rounded transition-colors cursor-pointer"
                                            title={t('remove')}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">
                                        {z.type === 'circle' && `${t('circle')}`}
                                        {z.type === 'polygon' && `${t('polygon')}`}
                                        {z.type === 'line' && `${t('line')}`}
                                    </span>
                                    {z.type === 'circle' && (
                                        <span className="text-gray-400">
                                            {(z.radius / 1000).toFixed(1)} {t('km')}
                                        </span>
                                    )}
                                    {z.type === 'polygon' && (
                                        <span className="text-gray-400">
                                            {z.points.length} {t('points')}
                                        </span>
                                    )}
                                    {z.type === 'line' && (
                                        <span className="text-gray-400">
                                            {z.points.length} {t('points')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, id: null })}
                onConfirm={handleConfirmDelete}
                title={t('modal-remove-title')}
                message={t('modal-remove-message')}
                type="confirm"
                confirmText={t('remove')}
                cancelText={t('cancel')}
            />
        </>
    );
}