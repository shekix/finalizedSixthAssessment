import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';



export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderserice:LoaderService = inject(LoaderService);
  loaderserice.show();
  return next(req).pipe(
    finalize(() => loaderserice.hide()),
  );
};
