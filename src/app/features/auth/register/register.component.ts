import { Component, type OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../../core/services/auth.service"

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isSubmitting = false
  errorMessage = ""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return
    }

    this.isSubmitting = true
    this.errorMessage = ""

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(["/auth/login"], {
          queryParams: { registered: "true" },
        })
      },
      error: (error) => {
        this.isSubmitting = false
        this.errorMessage = error.error?.message || "Registration failed. Please try again."
      },
    })
  }
}
