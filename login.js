angular.module('ePostalApp', [])
.controller('ParcelController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.errorMessage = '';

    // Function to handle user login
    $scope.login = function() {
        const loginUrl = 'http://localhost:3000/users?email=' + $scope.user.email + '&password=' + $scope.user.password;

        $http.get(loginUrl).then(function(response) {
            if (response.data.length > 0) {
                $scope.errorMessage = ''; // Clear any previous error messages
                console.log("Login successful:", response.data[0]); // Handle successful login
            } else {
                $scope.errorMessage = 'Invalid email or password.';
            }
        }, function(error) {
            $scope.errorMessage = 'Error during login. Please try again.';
            console.error(error);
        });
    };

    // Function to navigate to the registration page or section
    $scope.goToRegister = function() {
        $window.location.href = 'register.html'; // Change to your registration page URL
    };
}]);