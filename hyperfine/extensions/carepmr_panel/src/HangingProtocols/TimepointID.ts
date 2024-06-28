export default displaySet => {
  const TimePointID = displaySet?.images[0]?.ClinicalTrialTimePointID;
  console.log(TimePointID);
  if (!TimePointID) {
    return undefined;
  }

  return `${TimePointID}`;
};
