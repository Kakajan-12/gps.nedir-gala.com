'use client';

import { useState } from 'react';
import { Circle, Pentagon, X, Minus } from 'lucide-react';
import Modal from './Modal';
import {useTranslations} from "next-intl";

interface GeozoneFormProps {
    onStartDrawing: (type: 'circle' | 'polygon' | 'line', name: string, color: string) => void;
    onCancel: () => void;
    drawMode: 'none' | 'circle' | 'polygon' | 'line';
}

export default function GeozoneForm({ onStartDrawing, onCancel, drawMode }: GeozoneFormProps) {
    const t = useTranslations('Geozones')
    const [name, setName] = useState('');
    const [color, setColor] = useState('#3b82f6');
    const [showModal, setShowModal] = useState(false);

    const handleStartDrawing = (type: 'circle' | 'polygon' | 'line') => {
        if (!name.trim()) {
            setShowModal(true);
            return;
        }
        onStartDrawing(type, name.trim(), color);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="font-bold text-lg mb-3">{t('add-geozone')}</h3>

                <div className="space-y-3">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('name-geozone')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={drawMode !== 'none'}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('color')}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                                disabled={drawMode !== 'none'}
                            />
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={drawMode !== 'none'}
                            />
                        </div>
                    </div>

                    {drawMode === 'none' ? (
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => handleStartDrawing('circle')}
                                disabled={!name.trim()}
                                className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center justify-center gap-1 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <Circle className="w-5 h-5" />
                                <span className="text-xs">{t('circle')}</span>
                            </button>
                            <button
                                onClick={() => handleStartDrawing('polygon')}
                                disabled={!name.trim()}
                                className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex flex-col items-center justify-center gap-1 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <Pentagon className="w-5 h-5" />
                                <span className="text-xs">{t('polygon')}</span>
                            </button>
                            <button
                                onClick={() => handleStartDrawing('line')}
                                disabled={!name.trim()}
                                className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center justify-center gap-1 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <Minus className="w-5 h-5" />
                                <span className="text-xs">{t('line')}</span>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={handleCancel}
                                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <X className="w-5 h-5" />
                                {t('cancel-drawing')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Внимание"
                message="Введите название геозоны перед началом рисования"
                type="alert"
                confirmText="Понятно"
            />
        </>
    );
}