import React from "react";

function ButtonSinglePeriod({
    period,
    dynamic,
    selectedPeriod,
    setPeriod_id,
    setSelectedPeriod,
    activePeriod,
    disabledPeriod,
    periodHasSession,
    setTime,
}: any) {
    const handleAddPeriods = () => {
        setPeriod_id(period?.id);
        setSelectedPeriod(period?.id);
        setTime(period);
    };

    return (
        <button
            disabled={period.disabled || period?.has_session}
            className={`bg-[#e6f3f2] mx-2 p-1 py-2 rounded-xl mt-2 ${
                dynamic && selectedPeriod === period?.id
                    ? activePeriod
                    : period.disabled
                    ? disabledPeriod
                    : period?.has_session
                    ? periodHasSession
                    : "bg-[#e6f3f2]"
            }`}
            onClick={() => handleAddPeriods()}>
            {period?.time}
        </button>
    );
}

export default ButtonSinglePeriod;
