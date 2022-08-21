import { Subjects } from "./subjects";

interface AnimeListUpdatedEvent {
  subject: Subjects.AnimeListUpdated;
  data: {
    titles: {
        title: string;
        type: string;
    }[];
    type: string;
    malId: string;
    images: string;
    episodes: number;
    duration: string;
    rating: string;
    score: number;
    synopsis: string;
    comments: {
        username: string,
        content: string,
        userId: string
    }[];
    genres: {
        name: string
    }[];
  };
}

export {AnimeListUpdatedEvent};