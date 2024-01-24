import { IsNull, Like, Not } from 'typeorm';
import { appDataSource } from '../../dataSource';
import { GetChristian } from '../../types/christian/createChristian';
import { returnCustomMeetingStructure } from '../../utils/returnCustomMeetingStructure';
import { returnSpecificMeetingData } from '../../utils/returnSpecificMeetingData';
import { returnFemaleParts } from '../../utils/returnFemaleParts';

export const generateDesignationService = async (period: string) => {
  try {
    let queryOptions = { gender: 'female', allowedToParticipate: true };
    let pioneers: GetChristian[];
    let publishers: GetChristian[];

    const specificMeetingData = await returnSpecificMeetingData(period);

    const filteredData = returnFemaleParts(specificMeetingData);
    const parts = returnCustomMeetingStructure(filteredData, period);

    const christiansRepository = appDataSource.getRepository('christians');

    const designations = [];

    pioneers = (await christiansRepository.find({
      where: {
        ...queryOptions,
        roles: '["pioneiro"]',
        dateOfLastPart: IsNull(),
      },
      order: { lastPartMilliseconds: 'ASC' },
      take: parts.length,
    })) as GetChristian[];

    publishers = (await christiansRepository.find({
      where: {
        ...queryOptions,
        roles: '["publicador"]',
        dateOfLastPart: IsNull(),
      },
      order: { lastPartMilliseconds: 'ASC' },
      take: parts.length,
    })) as GetChristian[];

    if (pioneers.length < parts.length) {
      const pioneersToCompleteList = (await christiansRepository.find({
        where: {
          ...queryOptions,
          roles: '["pioneiro"]',
          lastPersonParticipatedName: Not(
            Like(
              `%${
                pioneers.length > 0
                  ? pioneers[pioneers.length - 1]?.lastPersonParticipatedName
                  : 'not found'
              }%`
            )
          ),
        },
        order: { lastPartMilliseconds: 'ASC' },
        take: parts.length - pioneers.length,
      })) as GetChristian[];

      pioneers = pioneers.concat(pioneersToCompleteList);
    }
    if (publishers.length < parts.length) {
      const publishersToCompleteList = (await christiansRepository.find({
        where: {
          ...queryOptions,
          roles: '["publicador"]',
          lastPersonParticipatedName: Not(
            Like(
              `%${
                publishers.length > 0
                  ? publishers[publishers.length - 1]
                      ?.lastPersonParticipatedName
                  : 'not found'
              }%`
            )
          ),
        },
        order: { lastPartMilliseconds: 'ASC' },
        take: parts.length - publishers.length,
      })) as GetChristian[];

      publishers = publishers.concat(publishersToCompleteList);
    }

    for (let index = 0; index < parts.length; index++) {
      const currentPublisher = publishers[index];
      const currentPioneer = pioneers[index];
      const part = parts[index];

      const designation = {
        ...part,
        owner: {
          name: currentPioneer.name,
          lastPersonParticipatedName: currentPioneer.lastPersonParticipatedName,
        },
        assistant: {
          name: currentPublisher.name,
          lastPersonParticipatedName:
            currentPublisher.lastPersonParticipatedName,
        },
      };

      designations.push(designation);

      await christiansRepository.update(currentPioneer.id, {
        dateOfLastPart: new Date(),
        lastPartMilliseconds: new Date().getTime(),
        lastPersonParticipatedName: currentPublisher.name,
        currentResponsibilities: JSON.stringify([
          {
            name: part.partName,
            date: new Date(),
            assistant: currentPublisher.name,
          },
        ]),
      });

      await christiansRepository.update(currentPublisher.id, {
        dateOfLastPart: new Date(),
        lastPartMilliseconds: new Date().getTime(),
        lastPersonParticipatedName: currentPioneer.name,
        currentResponsibilities: JSON.stringify([
          {
            name: part.partName,
            date: new Date(),
            owner: currentPioneer.name,
          },
        ]),
      });
    }

    return designations;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
