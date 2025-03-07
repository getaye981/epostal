angular.module('ePostalApp', [])
.controller('ParcelController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
        $scope.user = JSON.parse(userData);
    } else {
        $window.location.href = 'index.html'; // Redirect to login if no user data
    }

    // Set initial active page
    $scope.currentPage = 'profile';

    // Navigation functions
    $scope.goToParcel = function() {
        $scope.currentPage = 'parcel'; // Set active page
        $window.location.href = 'parcel.html'; // Redirect to parcel booking page
    };

    $scope.goToTracking = function() {
        $scope.currentPage = 'tracking'; // Set active page
        $window.location.href = 'tracking.html'; // Redirect to tracking page
    };

    $scope.logout = function() {
        localStorage.removeItem('loggedInUser'); // Clear user data
        $window.location.href = 'home.html'; // Redirect to login page
    };
}]);