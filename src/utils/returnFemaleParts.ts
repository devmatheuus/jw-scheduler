import { formateMeetingWords } from './formateMeetingWords';

export const returnFemaleParts = (meetingData: string[]) => {
  const formattedMeetingData = formateMeetingWords(meetingData);

  const meetingDataLength = meetingData.length;

  if (meetingDataLength === 7) return [];

  const femaleParts = [
    'Fazendo discípulos',
    'Iniciando conversas',
    'Cultivando o interesse',
  ];

  const firstPointOfMeetingIndex = 3;
  const finalPointOfMeetingIndex = 7;

  const parts = formattedMeetingData.slice(
    firstPointOfMeetingIndex,
    finalPointOfMeetingIndex
  );

  const filteredData = parts.filter((part) => {
    if (femaleParts.includes(part)) {
      return part;
    }
  });

  return filteredData;
};
