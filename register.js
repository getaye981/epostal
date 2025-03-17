angular.module('ePostalApp', [])
.controller('ParcelController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {
        name: '',
        role: '',
        email: '',
        password: ''
    };
    $scope.message = '';

    // Function to register a new user
    $scope.registerUser = function() {
        const newUser = {
            name: $scope.user.name,
            email: $scope.user.email,
            role: $scope.user.role,
            password: $scope.user.password
        };

        // POST request to save the new user in db.json
        $http.post('http://localhost:3000/users', newUser).then(function(response) {
            // Handle success response
            $scope.message = 'Registration successful!';
            $scope.user = {}; // Clear the form
        }, function(error) {
            // Handle error response
            $scope.message = 'Error registering user.';
            console.error(error);
        });
    };
}]);