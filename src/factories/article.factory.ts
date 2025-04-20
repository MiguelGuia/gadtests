import { AddArticle } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomArticle(
  titleLength?: number,
  bodyParagraphs = 5,
): AddArticle {
  let title: string;

  if (titleLength) title = faker.string.alpha(titleLength);
  else title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(bodyParagraphs);

  const newArticle: AddArticle = { title: title, body: body };

  return newArticle;
}
