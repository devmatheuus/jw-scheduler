export const formateMeetingWords = (meetingWords: string[]) => {
  return meetingWords.map((word) => word.replace(/^\d+\.\s/, ''));
};
