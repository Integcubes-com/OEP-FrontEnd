import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  test:any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  // adminSet() {
  //   this.authForm.get("username").setValue("admin@hospital.org");
  //   this.authForm.get("password").setValue("admin@123");
  // }
  // doctorSet() {
  //   this.authForm.get("username").setValue("doctor@hospital.org");
  //   this.authForm.get("password").setValue("doctor@123");
  // }
  // patientSet() {
  //   this.authForm.get("username").setValue("patient@hospital.org");
  //   this.authForm.get("password").setValue("patient@123");
  // }
  onSubmit() {
    
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      this.loading = false;
      return;
    } else {
      // this.subs.sink = this.authService.test().subscribe({
      //   next:data=>{this.test = data;debugger;}
      // })
      this.subs.sink = this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res!=0) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.Level3 || role === Role.All) {
                  this.router.navigate(["/admin/dashboard/main"]);
                } else if (role === Role.Level2) {
                  this.router.navigate(["/doctor/dashboard"]);
                } else if (role === Role.Level1) {
                  this.router.navigate(["/patient/dashboard"]);
                } else {
                  this.router.navigate(["/authentication/signin"]);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = "Incorrect username or password";
              this.submitted = false;
              this.loading = false;
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}
