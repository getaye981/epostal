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
                        $scope.errorMessage = ''; // Clear previous error messages
                        localStorage.setItem('loggedInUser', JSON.stringify(response.data[0])); // Store user data in localStorage
                        $window.location.href = 'profile.html'; // Redirect to profile page upon successful login
                    } else {
                        $scope.errorMessage = 'Invalid email or password. Please try again.';
                    }
                }, function(error) {
                    $scope.errorMessage = 'Error during login. Please try again.';
                    console.error(error);
                });
            };

            // Navigation function for registration
            $scope.goToRegister = function() {
                $window.location.href = 'register.html'; // Redirect to registration page
            };
        }]);