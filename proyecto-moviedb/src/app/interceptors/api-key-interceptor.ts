import { HttpInterceptorFn } from '@angular/common/http';

// Token Bearer de TMDb para autenticar todas las peticiones a la API
// Este token se obtiene desde tu cuenta de TMDb (Settings → API → Read Access Token)
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTg1YmI0OTZiYmIyMDViZWU1OGM1NzY4ZTI3NDg5ZiIsIm5iZiI6MTc2MzM2NzY4My43MTI5OTk4LCJzdWIiOiI2OTFhZGIwM2E2YTU5N2JmOWY2ZDkyZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dP4DqUP92sOPJ3yFn1T9pDyzFzfwK8UG8PlcdMrinL0'

// API Key (v3) para endpoints de autenticación
// Ve a https://www.themoviedb.org/settings/api y copia tu API Key (v3 auth)
const API_KEY = '0a85bb496bbb205bee58c5768e27489f';

/**
 * INTERCEPTOR DE AUTENTICACIÓN
 * Este interceptor funcional se ejecuta automáticamente en TODAS las peticiones HTTP
 * @param req - La petición HTTP original
 * @param next - Función para continuar con la petición (modificada o no)
 * @returns Observable con la respuesta HTTP
 */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // Verificar si la URL es de TMDb
  const isTMDbRequest = req.url.includes('themoviedb.org');
  
  if (!isTMDbRequest) {
    return next(req); // No es TMDb, continuar sin modificar
  }

  // Verificar si es un endpoint de autenticación
  const isAuthEndpoint = req.url.includes('/authentication/');
  
  if (isAuthEndpoint) {
    // Para endpoints de autenticación, usar API Key como parámetro
    const urlWithKey = req.url + (req.url.includes('?') ? '&' : '?') + `api_key=${API_KEY}`;
    const reqWithApiKey = req.clone({
      url: urlWithKey
    });
    return next(reqWithApiKey);
  } else {
    // Para otros endpoints, usar Bearer token
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${API_TOKEN}`),
    });
    return next(reqWithHeader);
  }
};
