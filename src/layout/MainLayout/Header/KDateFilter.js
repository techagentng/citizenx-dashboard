import React, { useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { enGB } from 'date-fns/locale';

const KDateFilter = () => {
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
        // No-op for static version
    };

    const handleReset = () => {
        setSelectionRange(initialRange);
        setShowFilterDropdown(false);
    };

    return (
        <div className="relative flex justify-end">
            <button onClick={() => setShowFilterDropdown((v) => !v)} style={{marginBottom: 8, borderRadius: 12, border: '1px solid #EA157F', color: '#EA157F', padding: '8px 20px', background: 'white', cursor: 'pointer'}}>Date Filter</button>
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
                            rangeColors={["#EA157F"]}
                        />
                    ) : (
                        <DateRangePicker
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={[selectionRange]}
                            direction="horizontal"
                            maxDate={maxDate}
                            rangeColors={["#EA157F"]}
                        />
                    )}
                    <div style={{ display: 'flex', justifyContent: 'end', gap: 24, marginTop: 20 }}>
                        <button onClick={handleReset} style={{height: 40, width: 96, borderRadius: 24, background: '#f4f4f4', border: 'none', color: '#333', cursor: 'pointer'}}>Reset</button>
                        <button onClick={handleCustomFilter} style={{height: 40, width: 96, borderRadius: 24, background: '#EA157F', border: 'none', color: 'white', cursor: 'pointer'}}>Filter</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KDateFilter;
