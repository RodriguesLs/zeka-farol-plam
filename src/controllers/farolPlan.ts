import tamboroApi from '../api/tamboroApi.js';
import zekaApi from '../api/zekaApi.js';

const ZEKA_ID_COURSES: any = {
  "52": 1, "63": 2, "72": 3, "66": 4, "60": 5, "12": 6, "9": 7, "32": 8, "116": 10,
  "119": 11, "10": 12, "76": 13, "84": 14, "4": 15, "5": 16, "3": 18, "117": 19,
  "2": 21, "65": 22, "106": 23, "111": 24, "110": 26, "107": 27, "118": 29, "109": 30,
  "105": 31, "108": 32, "81": 33, "44": 34, "41": 36, "69": 37, "114": 39, "55": 40,
  "43": 41, "42": 42, "115": 45, "11": 46
}

const ZEKA_STATUS: any = {
  'INICIADO': 'initialized', 'NÃO INICIADO': 'uninitialized', 'FINALIZADO': 'finalized'
}

export const updateCoursesHistories = async () => {
  try {
    let counter = 0;
    const response: any = await tamboroApi.get('/courses-history?userCode=TRIGO');

    console.log('Download concluded successfull');

    const ids = [... new Set(response?.data?.history.map((h: any) => h.id_user))];

    let userErrs: any = [];

    for(const id of ids) {
      let oldCourses = response.data.history.filter((h: any) => h['id_user'] === id);

      let diagnostics = 0;
      let finalizedDiag = 0;
      let finalizedCourse = 0;
      const courses = oldCourses.map((c: any) => {
        const {
          course_id, finish_date, initial_date, itinerary_points, proficiency_fifth_scale,
          status, registration_date, proficiency_percent_scale
        } = c;

        // channel (id, name, courses) has_many: courses
        // course (id, name, channel_id) belongs_to :channel
        // courses_history (id, course_id, finish_date, initial_date...)
        let realCourseId = ZEKA_ID_COURSES[course_id];
        let details = '';

        if (!realCourseId) {
          console.log('Aqui');
          realCourseId = 47;
          details = c.course;
        }

        // [52, 63, 72, 66]
        if (course_id == 52 || course_id == 63 || course_id == 72 || course_id == 66) {
          diagnostics++;

          if(diagnostics > 4) {
            return;
          } else {
            if (status == 'FINALIZADO') finalizedDiag++;
          }
        } else {
          if (status == 'FINALIZADO') finalizedCourse++;
        }

        return {
          course_id: realCourseId,
          finish_date,
          initial_date,
          itinerary_points,
          proficiency_fifth_scale,
          status: ZEKA_STATUS[status],
          registration_date,
          proficiency_percent_scale,
          details
        }
      });

      const currentUser = response.data.history.find((h: any) => h['id_user'] == id)

      console.log({ count: courses.length });

      const userPayload = {
        name: currentUser.name,
        tamboro_user_guid: currentUser.guid,
        email: currentUser.email,
        user_code: currentUser.user_code,
        already_access: currentUser.user_access_status == 'Já acessou',
        finalized_diagnostic: finalizedDiag === 4,
        finalized_course: finalizedCourse === 33,
        courses
      }

      try {
        const responseZeka = await zekaApi.post('/students/register_history', userPayload);

        console.log(counter);
        counter++;
        console.log(responseZeka.status)
      } catch (err) {
        console.log({ err });

        userErrs.push(id);
      }
    }

    return { ...response, err: userErrs };
  } catch (err: any) {
    console.log({ err });

    return { status: err?.response?.status, data: err?.response?.data?.errors || err?.response?.data };
  }
};

export const downloadFarolPlan = async () => {
  try {
    const response: any = await tamboroApi.get('/courses-history');

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
