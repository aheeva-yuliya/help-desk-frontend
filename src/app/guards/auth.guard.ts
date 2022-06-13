import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(TokenStorageService) private tokenStorage: TokenStorageService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('guard');
        return this.tokenStorage.getToken() !== '';
    }
}
