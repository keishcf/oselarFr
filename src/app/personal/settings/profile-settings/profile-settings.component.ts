import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button'
import { InputMaskModule } from 'primeng/inputmask';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { AccountsService } from '../../../accounts/accounts.service';
import { combineLatest } from 'rxjs';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';




@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ReactiveFormsModule,MessagesModule, FileUploadModule, RouterLink, CommonModule, DropdownModule, InputTextModule, InputTextareaModule, RadioButtonModule, ButtonModule, InputMaskModule, IconFieldModule, InputIconModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
  providers: [MessageService]
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private fb:FormBuilder, private accountService:AccountsService, private route:ActivatedRoute, private messageService: MessageService) {}

  loggedInUser: any = {}
  messages: Message[] | undefined;
  loading: boolean = true

  joined = combineLatest([this.accountService.getCurrentUser(), this.accountService.getUserProfile()])

  Genders: any[] = [
    {name: 'Male', key: 'male'},
    {name: 'Female', key: 'male'},
    {name: 'other', key: 'other'}
  ]

  ProfileUpdateForm!: FormGroup

  selectedCountry: string | undefined;
  countries  = [
      {name: 'Uganda', code: 'UG'},
      {name: 'Tanzania', code: 'TZ'},
      {name: 'Kenya', code: 'KE'},
      {name: 'Rwanda', code: 'RW'},
      {name: 'Burundi', code: 'BI'},
      {name: 'South Africa', code: 'ZA'},
      {name: 'Nigeria', code: 'NG'},
      {name: 'Ghana', code: 'GH'},
      {name: 'Egypt', code: 'EG'},
      {name: 'Morocco', code: 'MA'},
      {name: 'Mali', code: 'ML'},
      {name: 'Ivory Coast', code: 'CI'},
      {name: 'Mozambique', code: 'MZ'},
      {name: 'Eritrea', code: 'ER'},
      {name: 'Sudan', code: 'SD'},
      {name: 'Ethiopia', code: 'ET'},
      {name: 'Somalia', code: 'SO'},
  ];

  name: string = "kevin"

   get gender() {
    return this.ProfileUpdateForm.get('gender')
  }
  ngOnInit(): void {
    let userData:any
    let profileData:any
    this.route.data.subscribe({
      next: ({user, profile}) => {
        userData = user;
        profileData = profile
        this.loggedInUser = profile
      },
    })

    this.ProfileUpdateForm = this.fb.group({
      first_name: [`${userData.first_name}`],
      last_name: [`${userData.last_name}`],
      bio: [profileData.bio != 'null' ? `${profileData.bio}`: '', [Validators.maxLength(200)]],
      phone: [profileData.phone != 'null' ? `${profileData.phone}`: ''],
      hometown: [profileData.hometown != 'null' ? `${profileData.hometown}`: ''],
      primary_language: [profileData.primary_language != 'null' ? `${profileData.primary_language}`: ''],
      web_url: [profileData.web_url != null ? `${profileData.web_url}`: ''],
      country: [`${profileData.country}`],
    })
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProfileUpdateForm.addControl('profile_picture', new FormControl(file))
    }
  }

  updateProfile() {
    const formdata = new FormData()
    formdata.append("first_name", this.ProfileUpdateForm.get('first_name')?.value)
    formdata.append("last_name", this.ProfileUpdateForm.get('last_name')?.value)
    if (this.ProfileUpdateForm.get('profile_picture')) {
      formdata.append("profile_picture", this.ProfileUpdateForm.get('profile_picture')?.value)
    }
    formdata.append("bio", this.ProfileUpdateForm.get('bio')?.value)
    formdata.append("phone", this.ProfileUpdateForm.get('phone')?.value)
    formdata.append("hometown", this.ProfileUpdateForm.get('hometown')?.value)
    formdata.append("primary_language", this.ProfileUpdateForm.get('primary_language')?.value)
    formdata.append("web_url", this.ProfileUpdateForm.get('web_url')?.value)
    formdata.append("country", this.ProfileUpdateForm.get('country')?.value)
    this.accountService.updateUserProfile(formdata).subscribe({
      next: (value) => {
        this.messageService.add({severity:'success', summary:'Success Operation', detail:'Profile Updated Successfully'});
        this.accountService.getLoggedInUser().subscribe()
        this.accountService.getUserProfile().subscribe()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
