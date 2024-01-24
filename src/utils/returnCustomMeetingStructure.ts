export const returnCustomMeetingStructure = (
  meetingData: string[],
  period: string
) => {
  const participation = meetingData.map((data) => {
    const obj = {
      period: period,
      partName: data,
      owner: '',
      assistant: '',
    };

    return obj;
  });

  return participation;
};
