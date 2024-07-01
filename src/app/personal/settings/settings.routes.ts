import { Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { PasswordSettingsComponent } from "./password-settings/password-settings.component";
import { AccountComponent } from "./account/account.component";
import { EmailComponent } from "./email/email.component";
import { inject } from "@angular/core";
import { AccountsService } from "../../accounts/accounts.service";


export const SettingsRoutes: Routes = [
  {path: '', redirectTo: "profile", pathMatch:"full"},
  {path: 'profile', component: ProfileSettingsComponent, title: "Profile Settings - Oselar", resolve: {
    user: () => inject(AccountsService).getCurrentUser(),
    profile: () => inject(AccountsService).getUserProfile()
  }},
  {path: 'password', component: PasswordSettingsComponent, title: "Password Settings - Oselar"},
  {path: 'account', component: AccountComponent, title: "Account Settings - Oselar"},
  {path: 'email', component: EmailComponent, title: "Email Settings - Oselar"},
];
