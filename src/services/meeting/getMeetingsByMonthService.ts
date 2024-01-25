import fs from 'fs';
import path from 'path';
import {
  monthsAliases,
  returnMonthsNames,
} from '../../utils/returnMonthsNames';

type Data = {
  [key: string]: string[];
};

export const getMeetingsByMonthService = async () => {
  const obj: any = {};
  const allMonths = returnMonthsNames();

  try {
    const meetingData = fs.readFileSync(
      path.resolve(__dirname, '../../meeting.json'),
      'utf-8'
    );

    const currentYear = new Date().getFullYear();
    const meetingObject = JSON.parse(meetingData)[currentYear];

    allMonths.forEach((month) => {
      const data = Object.values(
        meetingObject.find(
          (meeting: any) => Object.keys(meeting)[0] === monthsAliases[month]
        )
      )[0] as Data[];

      const dataHalf = Math.ceil(data.length / 2);
      const months = monthsAliases[month].split('-');

      const firstMonth = months[0];
      const secondMonth = months[1];

      if (month === firstMonth) {
        if (!obj[month]) {
          obj[month] = data.slice(0, dataHalf);
        }
      } else {
        if (!obj[secondMonth]) {
          obj[secondMonth] = data.slice(dataHalf);
        }
      }
    });

    return obj;
  } catch (error: any) {
    throw new Error("JSON file doesn't exist.");
  }
};
