import tamboroApi from '../api/tamboroApi.js';

export const downloadFarolPlan = async () => {
  try {
    const response: any = await tamboroApi.get('/courses-history');

    console.log('Download concluded successfull');

    return response;
  } catch (err: any) {
    console.log({ err });

    return { status: err?.response?.status, data: err?.response?.data?.errors || err?.response?.data };
  }
};

export const downloadLatestActivitiesPlan = async () => {
  try {
    const response: any = await tamboroApi.get('/courses-latest-activities');

    console.log('Download latest-activities concluded successfull');

    return response;
  } catch (err: any) {
    console.log({ err });

    return { status: err?.response?.status, data: err?.response?.data?.errors || err?.response?.data };
  }
};
