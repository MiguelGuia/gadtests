import { AddArticle } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomNewArticle(): AddArticle {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(5);

  const newArticle: AddArticle = { title: title, body: body };

  return newArticle;
}
