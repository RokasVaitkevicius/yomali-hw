import * as yup from 'yup';

const validAggregations = ['minute', 'hour', 'day', 'month'];

// TODO: improve to also validate from and to dates
export const visitsAggregationSchema = yup.object().shape({
  aggregation: yup
    .string()
    .oneOf(validAggregations, `Invalid aggregation. Valid aggregations are: ${validAggregations.join(', ')}`),
});
