<?php
$pgTitle = 'Sign Up';
require_once ("./header.php")
?>
    <div class="container-fluid">
        <div class="row" style="min-height: 100vh;">
            <div class="col-10 col-sm-8 col-md-6 d-flex flex-column justify-content-center m-auto">
                <h1 class="text-center"><span class="text-primary">Pro</span>Gram</h1>
                <h3 class="text-center">Signup</h3>

                <form action="" class="p-2">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-6">
                                <label for="fname" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="fname" name="fname">
                            </div>
                            <div class="col-6">
                                <label for="lname" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lname" name="lname">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="uname" class="form-label">Username</label>
                        <input type="text" class="form-control" id="uname" name="uname">
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-6">
                                <label for="gender" class="form-check-label">Gender</label>
                                <div>
                                    <input type="radio" class="form-check-input" id="gender" name="gender" value="1">
                                    <label for="male" class="form-check-label">Male</label>
                                    <input type="radio" class="form-check-input" id="gender" name="gender" value="2">
                                    <label for="female" class="form-check-label">Female</label>
                                    <input type="radio" class="form-check-input" id="gender" name="gender" value="0">
                                    <label for="other" class="form-check-label">Other</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <label for="" class="form-check-label">Terms</label>
                                <div>
                                    <input type="checkbox" class="form-check-input" value="1"> Agree
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
</body>
</html>
<?php
require_once ("./footer.php")
?>