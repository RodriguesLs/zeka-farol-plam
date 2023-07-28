import tamboroApi from '../api/tamboroApi.js';

export const downloadPlan = async () => {
  try {
    const response: any = await tamboroApi.get('/');

    return response;
  } catch (err: any) {
    console.log({ err });

    return { status: err?.response?.status, data: err?.response?.data?.errors || err?.response?.data };
  }
}
