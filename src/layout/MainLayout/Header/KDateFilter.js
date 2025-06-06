import React, { useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { enGB } from 'date-fns/locale';

const KDateFilter = ({ onFilter }) => {
    const initialRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    };
    const [selectionRange, setSelectionRange] = useState(initialRange);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const maxDate = new Date();

    const handleDateChange = (ranges) => {
        setSelectionRange(ranges.selection);
    };

    const handleCustomFilter = () => {
        setShowFilterDropdown(false);
        if (onFilter) {
            // Ensure dates are formatted as YYYY-MM-DD
            const formatDate = (date) => {
                if (!date) return '';
                if (typeof date === 'string') return date.slice(0, 10);
                return date.toISOString().slice(0, 10);
            };
            onFilter(formatDate(selectionRange.startDate), formatDate(selectionRange.endDate));
        }
    };

    const handleReset = () => {
        setSelectionRange(initialRange);
        setShowFilterDropdown(false);
    };

    return (
        <div className="relative flex justify-end">
            <button onClick={() => setShowFilterDropdown((v) => !v)} style={{marginBottom: 8, borderRadius: 8, border: '1px solid #2F872F', color: '#2F872F', padding: '15px 20px', background: 'white', cursor: 'pointer'}}>Date Filter</button>
            {showFilterDropdown && (
                <div style={{ position: 'absolute', zIndex: 10, right: 0, background: 'white', border: '1px solid #eee', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 16, minWidth: 320 }}>
                    {window.innerWidth < 700 ? (
                        <DateRange
                            locale={enGB}
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={[selectionRange]}
                            direction="horizontal"
                            maxDate={maxDate}
                            rangeColors={["#2F872F"]}
                        />
                    ) : (
                        <DateRangePicker
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={[selectionRange]}
                            direction="horizontal"
                            maxDate={maxDate}
                            rangeColors={["#2F872F"]}
                        />
                    )}
                    <div style={{ display: 'flex', justifyContent: 'end', gap: 24, marginTop: 20 }}>
                        <button onClick={handleReset} style={{height: 40, width: 96, borderRadius: 24, background: '#f4f4f4', border: 'none', color: '#333', cursor: 'pointer'}}>Reset</button>
                        <button onClick={handleCustomFilter} style={{height: 40, width: 96, borderRadius: 24, background: '#2F872F', border: 'none', color: 'white', cursor: 'pointer'}}>Filter</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KDateFilter;
