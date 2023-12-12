<!-- Home.vue (or your main component) -->
<template>
    <div>
        <main>
            <div class="container">

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div class="d-flex justify-content-center py-4">
                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                        <img src="assets/img/logo.png" alt="">
                        <span class="d-none d-lg-block">DWL</span>
                        </a>
                    </div><!-- End Logo -->

                    <div class="card mb-3">

                        <div class="card-body">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                            <p class="text-center small">Enter your username & password to login</p>
                        </div>

                        <form class="row g-3 needs-validation" novalidate @submit.prevent="login">

                            <div class="col-12">
                            <label for="yourEmail" class="form-label">Email</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-envelope"></i></span>
                                <input type="text" v-model="email" class="form-control" id="yourEmail" required>
                                <div class="invalid-feedback">Please enter your username.</div>
                            </div>
                            </div>

                            <div class="col-12">
                            <label for="yourPassword" class="form-label">Password</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-key-fill"></i></span>
                                <input type="password" v-model="password" class="form-control" id="yourPassword" required>
                                <div class="invalid-feedback">Please enter your password.</div>
                            </div>
                            </div>

                            <div class="col-12">
                                <v-btn style="background-color: #0066ff; color: white; font-weight: bold;"
                                    :loading="loading"
                                    class="flex-grow-1"
                                    width="100%"
                                    variant="tonal"
                                    @click="login"
                                >
                                    Login
                            </v-btn>
                            </div>
                        </form>

                        </div>
                    </div>

                    <div class="credits">
                        <!-- All the links in the footer should remain intact. -->
                        <!-- You can delete the links only if you purchased the pro version. -->
                        <!-- Licensing information: https://bootstrapmade.com/license/ -->
                        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>

                    </div>
                </div>
                </div>

            </section>
            </div>
        </main><!-- End #main -->
    </div>
</template>

<script>
import axios from 'axios';
import NProgress from 'nprogress';

export default {
    data() {
        return {
            loading: false,
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                NProgress.start();
                this.loading = true
                await new Promise(resolve => setTimeout(resolve, 1000));
                const Url = 'http://localhost:8881/api/login'

                let data = {
                    email: this.email,
                    password: this.password,
                }
                
                const response = await axios.post(Url, JSON.stringify(data));

                if (response.data.data.token !== null && response.data.data.token !== undefined) {
                    localStorage.setItem('tokenLoginDwl', response.data.data.token);
                    this.$router.push('/');
                }else{
                    this.$router.push('/login');
                }
                // Redirect or perform any other actions upon successful login
            } catch (error) {

                if (error.response.status == 400) {
                    this.ToastttError(error.response.data.error)
                }else{
                    // Handle login error
                    this.ToastttError(error)
                }
                console.error('Login error', error);
            }
            this.loading = false
            NProgress.done();
        },
        ToastttError(errorR){
            const Toast = this.$swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = this.$swal.stopTimer;
                    toast.onmouseleave = this.$swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: errorR || "Failed Login"
            });
        },
    },
};

</script>