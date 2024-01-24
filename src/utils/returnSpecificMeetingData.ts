import meetingJson from '../meeting.json';
import { monthsAliases } from './returnMonthsNames';

// celebracao-da-morte-marco-de-cristo-de-2024
// 26-de-fevereiro-3-de-marco-de-2024
// 19-25-de-fevereiro-de-2024

export const returnSpecificMeetingData = (period: string): string[] => {
  const periodArray = period.split('-');
  let month = periodArray.length === 6 ? periodArray[3] : periodArray[2];
  const currentYear = new Date().getFullYear().toString();

  if (period.includes('celebracao-da-morte')) {
    month = 'marco';
  }

  //@ts-ignore
  const data = meetingJson[currentYear].find((item) =>
    Object.keys(item)[0].includes(month)
  );

  const monthAlias = monthsAliases[month];

  const currentPeriod = data[monthAlias].find((week: string) =>
    Object.keys(week)[0].includes(period)
  );

  return Object.values(currentPeriod)[0] as string[];
};
