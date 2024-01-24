import path from 'path';
import fs from 'fs';

export const getMeetingDataService = async () => {
  try {
    const meetingData = fs.readFileSync(
      path.resolve(__dirname, '../../meeting.json'),
      'utf-8'
    );

    return JSON.parse(meetingData);
  } catch (error: any) {
    throw new Error("JSON file doesn't exist.");
  }
};
