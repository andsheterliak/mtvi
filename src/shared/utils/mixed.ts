import {
  Certification,
  Genres,
  ImagePath,
  MovieCertifications,
  PersonItem,
  TVShowCertifications,
} from '~/api/tmdb';

type GetImagePathProps<Size> = {
  basePath: string;
  size: Size;
  path: ImagePath | undefined;
  fallback: string;
};

type Sizes = Record<string, string>;

export type CustomImagePath = string;

export function getImagePath<Size extends string>(
  imgPathData: GetImagePathProps<Size>
): CustomImagePath;

export function getImagePath<Size extends Sizes, SizeKeys extends keyof Size>(
  imgPathData: GetImagePathProps<Size>
): Record<SizeKeys, string>;

export function getImagePath<Size extends string | Sizes>({
  basePath,
  size,
  path,
  fallback,
}: GetImagePathProps<Size>) {
  if (typeof size === 'object') {
    const paths: Record<string, string> = {};
    const sizeValues = Object.values<string>(size);

    sizeValues.forEach((sizeValue) => {
      paths[sizeValue] = path ? `${basePath}${sizeValue}${path}` : fallback;
    });

    return paths;
  }

  return path ? `${basePath}${size}${path}` : fallback;
}

export const getTopItems = <Item>(items: Item[], number = 9) => items.slice(0, number);

const ifIsMovieCertification = (
  certificationItem: MovieCertifications[0] | TVShowCertifications[0]
): certificationItem is MovieCertifications[0] => {
  return (certificationItem as MovieCertifications[0]).release_dates !== undefined;
};

export const getCertification = (data: MovieCertifications | TVShowCertifications) => {
  if (data.length === 0) return null;

  let certification: Certification | undefined;
  let isUSCertification: boolean;

  data.some((item) => {
    isUSCertification = item.iso_3166_1 === 'US';

    if (isUSCertification) {
      certification = ifIsMovieCertification(item)
        ? item.release_dates[0].certification
        : item.rating;
    }

    return isUSCertification;
  });

  return certification;
};

export const getGenres = (genres: Genres) => {
  if (genres.length === 0) return null;

  return genres.map((item) => item.name).join(', ');
};

export const getKnownFor = (knownForData: PersonItem['known_for']) => {
  return knownForData.map((el) => ('name' in el ? el.name : el.title)).join(', ');
};
