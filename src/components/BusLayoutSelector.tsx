import React, { useState } from 'react';
import { BusLayout } from './BusLayout';
import './BusLayoutSelector.css';

interface BusLayoutSelectorProps {
    className?: string;
}

export const BusLayoutSelector: React.FC<BusLayoutSelectorProps> = ({ className = '' }) => {
    const [selectedLayout, setSelectedLayout] = useState<'layout1' | 'layout2' | 'layout3'>('layout1');

    return (
        <div className={`bus-layout-selector ${className}`}>
            <div className="layout-tabs">
                <button
                    className={`tab-button ${selectedLayout === 'layout1' ? 'active' : ''}`}
                    onClick={() => setSelectedLayout('layout1')}
                >
                    Схема 1 IS 98 SIS
                </button>
                <button
                    className={`tab-button ${selectedLayout === 'layout2' ? 'active' : ''}`}
                    onClick={() => setSelectedLayout('layout2')}
                >
                    Схема 2 XWX 919
                </button>
                <button
                    className={`tab-button ${selectedLayout === 'layout3' ? 'active' : ''}`}
                    onClick={() => setSelectedLayout('layout3')}
                >
                    Схема 3  AEX 988
                </button>
            </div>

            <div className="layout-content">
                {selectedLayout === 'layout1' ? (
                    <BusLayout layoutType="layout1" />
                ) : selectedLayout === 'layout2' ? (
                    <BusLayout layoutType="layout2" />
                ) : (
                    <BusLayout layoutType="layout3" />
                )}
            </div>
        </div>
    );
};
