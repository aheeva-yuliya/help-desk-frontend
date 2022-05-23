import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.tokenStorage.removeToken();
    this.tokenStorage.removeRole();
  }

}
