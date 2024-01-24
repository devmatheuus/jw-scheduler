import { downloadHTML } from '../../utils/downloadHTML';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import {
  monthsAliases,
  returnMonthsNames,
} from '../../utils/returnMonthsNames';

const meetingDataObject: any = {};

const currentYear = new Date().getFullYear().toString();

const configureMeetingDataObject = async (): Promise<void> => {
  if (!meetingDataObject[currentYear]) meetingDataObject[currentYear] = [];

  const workbooksMonths: string[] = [];
  const months = returnMonthsNames();

  for (let index = 0; index < months.length; index += 2) {
    const firstMonth = months[index];
    const secondMonth = months[index + 1];

    workbooksMonths.push(`${firstMonth}-${secondMonth}`);
  }

  for (const month of workbooksMonths) {
    meetingDataObject[currentYear.toString()].push({ [month]: [] });
  }
};

const accessingAndSavingWorkbooksHTML = async (url: string): Promise<void> => {
  await downloadHTML(url, 'workbooks-links');
};

const extractLinksFromWorkbooksHTML = async (
  workbooksHTMLPath: string,
  classOfLinks: string
): Promise<string[]> => {
  const workbooksHTML = fs.readFileSync(workbooksHTMLPath, 'utf-8');

  const $ = cheerio.load(workbooksHTML);

  const links: string[] = [];

  $(classOfLinks).each((_, element) => {
    const link = $(element).attr('href');

    if (!link || link.includes('mwbr')) return;

    links.push(link);
  });

  return links;
};

const downloadEachWorkbookHTML = async (): Promise<void> => {
  const workbooksHTMLPath = path.resolve(
    __dirname,
    '../../temp/html/workbooks-links.html'
  );

  const classOfLinks = 'div.synopsis > div.syn-img > div.cvr-wrapper > a';

  const links = await extractLinksFromWorkbooksHTML(
    workbooksHTMLPath,
    classOfLinks
  );

  for (const link of links) {
    const baseurl = 'https://www.jw.org';
    const url = `${baseurl}${link}`;

    const fileName = link.split('/').filter(Boolean).pop();

    if (fileName) await downloadHTML(url, fileName);
  }
};

const downloadEachStudyOfTheWeekHTML = async (): Promise<void> => {
  await downloadEachWorkbookHTML();

  const months = returnMonthsNames();

  const classOfLinks = 'div.syn-body h2 > a';

  for (let index = 0; index < months.length; index += 2) {
    const firstMonth = months[index] || months[0];
    const secondMonth = months[index + 1];

    const fileName = `../../temp/html/${firstMonth}-${secondMonth}-${currentYear}-mwb.html`;

    const workbookHTMLPath = path.resolve(__dirname, fileName);

    if (!fs.existsSync(workbookHTMLPath)) continue;

    const links = await extractLinksFromWorkbooksHTML(
      workbookHTMLPath,
      classOfLinks
    );

    await startDownloadingTheHTMLOfEachStudyOfTheWeek(links);
  }
};

const startDownloadingTheHTMLOfEachStudyOfTheWeek = async (
  links: string[]
): Promise<void> => {
  const specialsWords: Record<string, string> = {
    '%E2%81%A': '',
    'mar%C3%A7o': 'marco',
    'A7%C3%A3o': 'celebracao-da-morte-de-cristo',
  };

  const baseurl = 'https://www.jw.org';

  for (const link of links) {
    let classToFindElements = 'div.bodyTxt h3[data-pid]';
    let regex: RegExp | undefined = /^\d.+/;

    const url = `${baseurl}${link}`;

    let filename = link.split('/').filter(Boolean).pop()?.slice(66);

    if (!filename) continue;

    for (const word in specialsWords) {
      if (filename.includes(word)) {
        filename = filename.replace(word, specialsWords[word]);
      }
    }

    if (filename.includes('celebracao-da-morte')) {
      classToFindElements = 'div.bodyTxt h2[data-pid]';
      regex = undefined;
      filename = 'celebracao-da-morte-marco-de-cristo-de-2024';
    }

    await downloadHTML(url, filename);
    await storeMeetingPoints(filename, classToFindElements, regex);
  }
};

const storeMeetingPoints = async (
  filename: string,
  classToFindElements: string,
  regex?: RegExp
): Promise<void> => {
  const filePath = path.resolve(__dirname, `../../temp/html/${filename}.html`);
  const html = fs.readFileSync(filePath, 'utf-8');

  const $ = cheerio.load(html);

  const filenameToArray = filename.split('-');
  let fileMonth =
    filenameToArray.length === 6 ? filenameToArray[3] : filenameToArray[2];

  if (filename.includes('celebracao-da-morte')) fileMonth = 'marco';

  const objectMonth = meetingDataObject[currentYear].find((month: string) =>
    Object.keys(month)[0].includes(fileMonth)
  );

  if (!objectMonth) return;

  const data = objectMonth[monthsAliases[fileMonth]];

  if (!data) return;

  data.push({ [filename]: [] });

  const objectWeek = data.find(
    (week: string) => Object.keys(week)[0] === filename
  );

  if (!objectWeek) return;

  $(classToFindElements).each((_, element) => {
    const meetingPoint = $(element).text().trim();

    if (regex && !regex.test(meetingPoint)) return;

    objectWeek[filename].push(meetingPoint);
  });
};

const saveToJson = async (): Promise<void> => {
  fs.writeFileSync(
    path.resolve(__dirname, '../../meeting.json'),
    JSON.stringify(meetingDataObject, null, 2)
  );
};

export const generateMeetingDataService = async (url: string) => {
  try {
    await configureMeetingDataObject();
    await accessingAndSavingWorkbooksHTML(url);
    await downloadEachStudyOfTheWeekHTML();

    saveToJson();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
