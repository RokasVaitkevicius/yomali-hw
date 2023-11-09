import * as yup from 'yup';

export const createVisitSchema = yup.object().shape({
  identifier: yup.string().required(),
  pageUrl: yup.string().url().required(),
  visitedAt: yup.date().required(),
});
