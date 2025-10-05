import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

  export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const username = 'me_cruzhurtado_franklinsteven';
    const password = '11Wa0rdE2PkCM4c7vZsy';

    const authToken = btoa(`${username}:${password}`);
    console.log("token de basic: ", authToken)
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    return next(authReq);
  }
