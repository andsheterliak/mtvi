import { MovieCreditCast, MovieCreditCrew, TVCreditCast, TVCreditCrew } from '~/api/tmdb';

export type JoinedCredits = (MovieCreditCast | MovieCreditCrew | TVCreditCast | TVCreditCrew)[];
