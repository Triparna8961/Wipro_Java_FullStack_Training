import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    // Redirect to dashboard if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    }
    
    return null;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, email, password } = this.registerForm.value;

    const newUser = {
      username: username,
      email: email,
      password: password,
      role: 'USER' // Default role for new registrations
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Registration successful! You can now login.', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.loading = false;
        
        let errorMessage = 'Registration failed. Please try again.';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
