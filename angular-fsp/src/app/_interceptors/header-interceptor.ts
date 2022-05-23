import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class HeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const webUser = localStorage.getItem(environment.storageUser)
        const token = webUser ? JSON.parse(webUser).token : '';

        const dupReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        return next.handle(dupReq);
    }

}