function ButtonMultiPeriods({
  period,
  dynamic,
  selectedPeriods,
  activePeriod,
  disabledPeriod,
  periodHasSession,
  setSelectedPeriods,
  item,
}: any) {
  const handleAddPeriods = (
    period: { id: any; time: any },
    item: { date: any }
  ) => {
    setSelectedPeriods({
      date: item?.date || "",
      period_id: period?.id,
      time: period?.time,
    });
  };

  return (
    <button
      className={`mx-2 w-full p-1 py-4 rounded-xl ${
        selectedPeriods.period_id == period?.id ? activePeriod : "bg-[#ececec]"
      }`}
      onClick={() => handleAddPeriods(period, item)}
    >
      {period?.time}
    </button>
  );
}

export default ButtonMultiPeriods;
