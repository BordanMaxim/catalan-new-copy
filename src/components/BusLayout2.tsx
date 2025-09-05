import React from 'react';
import './BusLayout.css';

interface SeatData {
  seatNumber: number;
  seatType: 'standard' | 'vip' | 'economy';
  isOccupied: boolean;
}

interface BusLayout2Props {
  seats?: SeatData[];
  selectedSeats?: number[];
  onSeatSelect?: (seatNumber: number) => void;
  getSeatData?: (seatNumber: number) => SeatData | undefined;
  isSeatSelected?: (seatNumber: number) => boolean;
  handleSeatClick?: (seatNumber: number) => void;
}

const BusLayout2: React.FC<BusLayout2Props> = ({ 
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
                <td className="seat-cell">78</td>
                <td className="seat-cell">79</td>
                <td className="seat-cell">80</td>
                <td className="seat-cell">81</td>
            </tr>

            {/* Masa */}
            <tr className="table-row">
                <td className="table-cell" colSpan={2}>Стіл</td>
                <td className="table-cell" colSpan={2}>Стіл</td>
            </tr>

            {/* Regular seats row 2 */}
            <tr className="seat-row">
                <td className="seat-cell">74</td>
                <td className="seat-cell">75</td>
                <td className="seat-cell">76</td>
                <td className="seat-cell">77</td>
            </tr>

            {/* Regular seats row 3 */}
            <tr className="seat-row">
                <td className="seat-cell">70</td>
                <td className="seat-cell">71</td>
                <td className="seat-cell">72</td>
                <td className="seat-cell">73</td>
            </tr>

            {/* Regular seats row 4 */}
            <tr className="seat-row">
                <td className="seat-cell">66</td>
                <td className="seat-cell">67</td>
                <td className="seat-cell">68</td>
                <td className="seat-cell">69</td>
            </tr>

            {/* Regular seats row 5 */}
            <tr className="seat-row">
                <td className="seat-cell">62</td>
                <td className="seat-cell">63</td>
                <td className="seat-cell">64</td>
                <td className="seat-cell">65</td>
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
                <td className="seat-cell">1</td>
                <td className="seat-cell">2</td>
                <td className="empty-cell" rowSpan={16}></td>
                <td className="seat-cell">3</td>
                <td className="seat-cell">4</td>
            </tr>

            <tr className="seat-row">
                <td className="stairs-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="stairs-badge">СХОДИ</span></strong>
                </td>
                <td className="seat-cell">5</td>
                <td className="seat-cell">6</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">7</td>
                <td className="seat-cell">8</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">9</td>
                <td className="seat-cell">10</td>
                <td className="seat-cell">11</td>
                <td className="seat-cell">12</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">13</td>
                <td className="seat-cell">14</td>
                <td className="seat-cell">15</td>
                <td className="seat-cell">16</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">17</td>
                <td className="seat-cell">18</td>
                <td className="seat-cell">19</td>
                <td className="seat-cell">20</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">21</td>
                <td className="seat-cell">22</td>
                <td className="seat-cell">23</td>
                <td className="seat-cell">24</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">25</td>
                <td className="seat-cell">26</td>
                <td className="seat-cell">27</td>
                <td className="seat-cell">28</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">29</td>
                <td className="seat-cell">30</td>
                <td className="seat-cell">31</td>
                <td className="seat-cell">32</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">33</td>
                <td className="seat-cell">34</td>
                <td className="seat-cell">35</td>
                <td className="seat-cell">36</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">37</td>
                <td className="seat-cell">38</td>
                <td className="stairs-cell" colSpan={2} rowSpan={2}>
                    <strong><span className="stairs-badge">СХОДИ</span></strong>
                </td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">39</td>
                <td className="seat-cell">40</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">41</td>
                <td className="seat-cell">42</td>
                <td className="seat-cell">43</td>
                <td className="seat-cell">44</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">45</td>
                <td className="seat-cell">46</td>
                <td className="seat-cell">47</td>
                <td className="seat-cell">48</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">49</td>
                <td className="seat-cell">50</td>
                <td className="seat-cell">51</td>
                <td className="seat-cell">52</td>
            </tr>

            <tr className="seat-row">
                <td className="seat-cell">53</td>
                <td className="seat-cell">54</td>
                <td className="seat-cell">55</td>
                <td className="seat-cell">56</td>
            </tr>

            <tr className="seat-row last-row">
                <td className="seat-cell">57</td>
                <td className="seat-cell">58</td>
                <td className="seat-cell">59</td>
                <td className="seat-cell">60</td>
                <td className="seat-cell">61</td>
            </tr>
        </tbody>
    </table>
  );
};

export default BusLayout2;
