import {Card} from './card';

export interface Blog extends Card {
  hasVideo: boolean;
  videoType?: string;
}
