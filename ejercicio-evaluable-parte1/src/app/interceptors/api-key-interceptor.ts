import { HttpInterceptorFn } from '@angular/common/http';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTg1YmI0OTZiYmIyMDViZWU1OGM1NzY4ZTI3NDg5ZiIsIm5iZiI6MTc2MzM2NzY4My43MTI5OTk4LCJzdWIiOiI2OTFhZGIwM2E2YTU5N2JmOWY2ZDkyZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dP4DqUP92sOPJ3yFn1T9pDyzFzfwK8UG8PlcdMrinL0'

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${API_TOKEN}`),
  });
  return next(reqWithHeader);
};
