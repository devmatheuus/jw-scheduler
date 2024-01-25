import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('christians')
export class Christians {
  @PrimaryColumn({ type: 'text' })
  public id: string;

  @Column({ type: 'text', length: 255 })
  public name: string;

  @Column({ type: 'text' })
  public roles: string;

  @Column({ type: 'text' })
  public gender: 'male' | 'female';

  @Column({
    type: 'text',
    name: 'date_of_last_part',
    nullable: true,
    default: null,
  })
  public dateOfLastPart: string;

  @Column({
    type: 'text',
    name: 'current_responsibility',
    default: '[]',
  })
  public currentResponsibilities: string;

  @Column({ type: 'boolean', default: true })
  public allowedToParticipate: boolean;

  @Column({
    type: 'integer',
    name: 'last_part_milliseconds',
    nullable: true,
    default: 0,
  })
  public lastPartMilliseconds: number;

  @Column({
    type: 'text',
    name: 'last_person_participated_name',
    nullable: true,
    default: null,
  })
  public lastPersonParticipatedName: string;

  @AfterLoad()
  private loadArrays(): void {
    this.roles = JSON.parse(this.roles);
    this.currentResponsibilities = JSON.parse(this.currentResponsibilities);
  }

  @BeforeInsert()
  private setUuid(): void {
    this.id = v4();
  }
}
