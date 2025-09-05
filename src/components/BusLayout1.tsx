import React from 'react';
import './BusLayout.css';

interface SeatData {
  seatNumber: number;
  seatType: 'standard' | 'vip' | 'economy';
  isOccupied: boolean;
}

interface BusLayout1Props {
  seats?: SeatData[];
  selectedSeats?: number[];
  onSeatSelect?: (seatNumber: number) => void;
  getSeatData?: (seatNumber: number) => SeatData | undefined;
  isSeatSelected?: (seatNumber: number) => boolean;
  handleSeatClick?: (seatNumber: number) => void;
}

const BusLayout1: React.FC<BusLayout1Props> = ({ 
  getSeatData, 
  isSeatSelected, 
  handleSeatClick 
}) => {
  const renderSeat = (seatNumber: number) => {
    const seatData = getSeatData?.(seatNumber);
    const isSelected = isSeatSelected?.(seatNumber) || false;
    const seatType = seatData?.seatType || 'standard';
    
    return (
      <td 
        key={seatNumber}
        className={`seat-cell ${seatType} ${isSelected ? 'selected' : ''}`}
        onClick={() => handleSeatClick?.(seatNumber)}
        style={{ cursor: 'pointer' }}
      >
        {seatNumber}
      </td>
    );
  };

  return (
    <table className="bus-table">
        <colgroup>
            <col width="20" />
            <col width="53" />
            <col width="61" />
            <col width="49" />
            <col width="59" />
            <col width="52" />
            <col width="20" />
        </colgroup>
        <tbody>
            {/* Nivelul I */}
            <tr className="level-header">
                <td className="empty-cell" rowSpan={30}>&nbsp;</td>
                <td className="level-title" colSpan={5}>
                    <strong><span className="level-badge">Поверх I</span></strong>
                </td>
                <td className="empty-cell" rowSpan={30}>&nbsp;</td>
            </tr>

            {/* SOFER */}
            <tr className="driver-row">
                <td className="driver-cell" colSpan={2}>
                    <strong><span className="driver-badge">ВОДІЙ</span></strong>
                </td>
                <td className="empty-cell" rowSpan={10}></td>
                <td className="stairs-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="stairs-badge">СХОДИ</span></strong>
                </td>
            </tr>

            {/* Guide seats */}
            <tr className="guide-seats">
                <td className="seat-cell guide-seat">82(гид)</td>
                <td className="seat-cell guide-seat">83(гид)</td>
            </tr>

            {/* Regular seats row 1 */}
            <tr className="seat-row">
                {renderSeat(78)}
                {renderSeat(79)}
                {renderSeat(80)}
                {renderSeat(81)}
            </tr>

            {/* Masa */}
            <tr className="table-row">
                <td className="table-cell" colSpan={2}>Стіл</td>
                <td className="table-cell" colSpan={2}>Стіл</td>
            </tr>

            {/* Regular seats row 2 */}
            <tr className="seat-row">
                {renderSeat(74)}
                {renderSeat(75)}
                {renderSeat(76)}
                {renderSeat(77)}
            </tr>

            {/* Regular seats row 3 */}
            <tr className="seat-row">
                {renderSeat(70)}
                {renderSeat(71)}
                {renderSeat(72)}
                {renderSeat(73)}
            </tr>

            {/* Regular seats row 4 */}
            <tr className="seat-row">
                {renderSeat(66)}
                {renderSeat(67)}
                {renderSeat(68)}
                {renderSeat(69)}
            </tr>

            {/* Regular seats row 5 */}
            <tr className="seat-row">
                {renderSeat(62)}
                {renderSeat(63)}
                {renderSeat(64)}
                {renderSeat(65)}
            </tr>

            {/* WC and SCARĂ */}
            <tr className="wc-stairs-row">
                <td className="wc-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="wc-badge">ТУАЛЕТ</span></strong>
                </td>
                <td className="stairs-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="stairs-badge">СХОДИ</span></strong>
                </td>

            </tr>
            <tr className="wc-stairs-row-continued">
            </tr>

            {/* Nivelul II */}
            <tr className="level-header">
                <td className="level-title" colSpan={5}>
                    <strong><span className="level-badge">Поверх II</span></strong>
                </td>
            </tr>

            {/* Second level seats - rows 1-16 */}
            <tr className="seat-row">
                {renderSeat(1)}
                {renderSeat(2)}
                <td className="empty-cell" rowSpan={16}></td>
                {renderSeat(3)}
                {renderSeat(4)}
            </tr>

            <tr className="seat-row">
                {renderSeat(5)}
                {renderSeat(6)}
                <td className="stairs-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="stairs-badge">СХОДИ</span></strong>
                </td>
            </tr>

            <tr className="seat-row">
                {renderSeat(7)}
                {renderSeat(8)}
            </tr>

            <tr className="seat-row">
                {renderSeat(9)}
                {renderSeat(10)}
                {renderSeat(11)}
                {renderSeat(12)}
            </tr>

            <tr className="seat-row">
                {renderSeat(13)}
                {renderSeat(14)}
                {renderSeat(15)}
                {renderSeat(16)}
            </tr>

            <tr className="seat-row">
                {renderSeat(17)}
                {renderSeat(18)}
                {renderSeat(19)}
                {renderSeat(20)}
            </tr>

            <tr className="seat-row">
                {renderSeat(21)}
                {renderSeat(22)}
                {renderSeat(23)}
                {renderSeat(24)}
            </tr>

            <tr className="seat-row">
                {renderSeat(25)}
                {renderSeat(26)}
                {renderSeat(27)}
                {renderSeat(28)}
            </tr>

            <tr className="seat-row">
                {renderSeat(29)}
                {renderSeat(30)}
                {renderSeat(31)}
                {renderSeat(32)}
            </tr>

            <tr className="seat-row">
                {renderSeat(33)}
                {renderSeat(34)}
                {renderSeat(35)}
                {renderSeat(36)}
            </tr>

            <tr className="seat-row">
                {renderSeat(37)}
                {renderSeat(38)}
                <td className="stairs-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="stairs-badge">СХОДИ</span></strong>
                </td>
            </tr>

            <tr className="seat-row">
                {renderSeat(39)}
                {renderSeat(40)}
            </tr>

            <tr className="seat-row">
                {renderSeat(41)}
                {renderSeat(42)}
                {renderSeat(43)}
                {renderSeat(44)}
            </tr>

            <tr className="seat-row">
                {renderSeat(45)}
                {renderSeat(46)}
                {renderSeat(47)}
                {renderSeat(48)}
            </tr>

            <tr className="seat-row">
                {renderSeat(49)}
                {renderSeat(50)}
                {renderSeat(51)}
                {renderSeat(52)}
            </tr>

            <tr className="seat-row">
                {renderSeat(53)}
                {renderSeat(54)}
                {renderSeat(55)}
                {renderSeat(56)}
            </tr>

            <tr className="seat-row last-row">
                {renderSeat(57)}
                {renderSeat(58)}
                {renderSeat(59)}
                {renderSeat(60)}
                {renderSeat(61)}
            </tr>
        </tbody>
    </table>
  );
};

export default BusLayout1;
