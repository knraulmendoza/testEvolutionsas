import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private modalService: NgbModal,) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem("token") != null || localStorage.getItem("token") != undefined) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`)
            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => { console.log('jum')},
                    err => {
                        console.log(err);
                        if (err.status == 401) {
                            console.log('el token vencio');
                            this.modalService.dismissAll();
                            localStorage.removeItem("token");
                            this.router.navigate(["/"]);
                        }
                    }
                )
            );
        } else {
            console.log('he ahdshaka shsdgds ');
            return next.handle(req.clone());
        }
    }
}
