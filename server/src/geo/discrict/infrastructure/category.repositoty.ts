import { District } from '../domain/discrict';

export abstract class DiscrictRepository {
  abstract findAll(): Promise<District[]>;
  abstract importDistricts(): Promise<void>;
}
