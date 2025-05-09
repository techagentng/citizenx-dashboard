import { useState, useEffect } from 'react';
import { getStates, getLGAs } from 'services/reportService';

export function useStatesAndLgas(selectedState) {
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);

    useEffect(() => {
        getStates()
            .then((response) => {
                let stateArray = response.states || response;
                if (!Array.isArray(stateArray)) stateArray = [];
                setStates(
                    stateArray
                        .filter((state) => state && state !== '')
                        .map((state) => {
                            const stateValue = typeof state === 'string' ? state : state.state;
                            return { value: stateValue, label: stateValue };
                        })
                );
            })
            .catch(() => setStates([]));
    }, []);

    useEffect(() => {
        if (selectedState) {
            getLGAs(selectedState)
                .then((lgaData) => {
                    setLgas(lgaData.map((lga) => ({ value: lga, label: lga })));
                })
                .catch(() => setLgas([]));
        } else {
            setLgas([]);
        }
    }, [selectedState]);

    return { states, lgas };
}
