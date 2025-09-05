import React from 'react';
import './BusLayout.css';
import BusLayout1 from './BusLayout1';
import BusLayout2 from './BusLayout2';
import BusLayout3 from './BusLayout3';

interface SeatData {
  seatNumber: number;
  seatType: 'standard' | 'vip' | 'economy';
  isOccupied: boolean;
}

interface BusLayoutProps {
    className?: string;
    layoutType?: 'layout1' | 'layout2' | 'layout3';
    seats?: SeatData[];
    selectedSeats?: number[];
    onSeatSelect?: (seatNumber: number) => void;
}

export const BusLayout: React.FC<BusLayoutProps> = ({ 
    className = '', 
    layoutType = 'layout1',
    seats = [],
    selectedSeats = [],
    onSeatSelect
}) => {
    const getSeatData = (seatNumber: number) => {
        return seats.find(seat => seat.seatNumber === seatNumber);
    };

    const isSeatSelected = (seatNumber: number) => {
        return selectedSeats.includes(seatNumber);
    };

    const handleSeatClick = (seatNumber: number) => {
        if (onSeatSelect) {
            onSeatSelect(seatNumber);
        }
    };

    return (
        <div className={`bus-layout-container ${className}`}>
            <h3>Схема автобуса</h3>
            <div className="bus-schema">
                {layoutType === 'layout1' && (
                    <BusLayout1 
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={onSeatSelect}
                        getSeatData={getSeatData}
                        isSeatSelected={isSeatSelected}
                        handleSeatClick={handleSeatClick}
                    />
                )}
                {layoutType === 'layout2' && (
                    <BusLayout2 
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={onSeatSelect}
                        getSeatData={getSeatData}
                        isSeatSelected={isSeatSelected}
                        handleSeatClick={handleSeatClick}
                    />
                )}
                {layoutType === 'layout3' && (
                    <BusLayout3 
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={onSeatSelect}
                        getSeatData={getSeatData}
                        isSeatSelected={isSeatSelected}
                        handleSeatClick={handleSeatClick}
                    />
                )}
            </div>
        </div>
    );
};