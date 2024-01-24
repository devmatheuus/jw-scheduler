import { getMeetingDataService } from '../services/meeting/getMeetingDataService';
import { monthsAliases } from './returnMonthsNames';

export const returnSpecificMeetingData = async (
  period: string
): Promise<string[]> => {
  try {
    const meetingJson = await getMeetingDataService();

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
  } catch (error: any) {
    throw new Error(error.message);
  }
};
