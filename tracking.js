var app = angular.module("ePostalApp", []);
app.controller('ParcelController', ['$scope', '$http', function($scope, $http) {
    $scope.trackingNumber = '';
    $scope.trackingStatus = '';
    $scope.bookingDetails = null;

    // Function to track parcel
    $scope.trackParcel = function() {
        const trackingUrl = 'http://localhost:3000/bookings?trackingNumber=' + $scope.trackingNumber;
        $http.get(trackingUrl).then(function(response) {
            if (response.data.length > 0) {
                $scope.bookingDetails = response.data[0]; // Get the first matching booking
                $scope.trackingStatus = 'Booking found!';
            } else {
                $scope.bookingDetails = null;
                $scope.trackingStatus = 'No booking found for this tracking number.';
            }
        }, function(error) {
            $scope.trackingStatus = 'Error fetching data.';
            console.error(error);
        });
    };
    $scope.goToParcel = function() {
        $window.location.href = 'parcel.html'; // Redirect to parcel booking page
    };
    
    $scope.goToTracking = function() {
        $window.location.href = 'tracking.html'; // Redirect to tracking page
    };
    
    $scope.goToProfile = function() {
        $window.location.href = 'profile.html'; // Redirect to user profile page
    };
}]);