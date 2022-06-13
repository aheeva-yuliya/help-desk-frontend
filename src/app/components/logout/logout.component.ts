import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private tokenStorage: TokenStorageService) { }

  public handleLogout() {
    this.tokenStorage.removeToken();
    this.tokenStorage.removeRole();
  }

}
