var app = angular.module("ePostalApp", []);



    app.controller('ParcelController', ['$scope', '$http', function($scope, $http) {
        $scope.parcel = {};
        $scope.parcelMessage = '';

        $scope.bookParcel = function() {
            // Generate a unique tracking number
            const trackingNumber = 'TRK-' + Math.floor(Math.random() * 1000000).toString();

            // Prepare the booking data
            const bookingData = {
                trackingNumber: trackingNumber,
                sender: $scope.parcel.sender,
                recipient: $scope.parcel.recipient,
                address: $scope.parcel.address,
                itemName: $scope.parcel.itemName,
                weight: $scope.parcel.weight
            };

            // Send booking data to the JSON Server
            $http.post('http://localhost:3000/bookings', bookingData).then(function(response) {
                $scope.parcelMessage = 'Parcel booked successfully! Tracking Number: ' + trackingNumber;
                $scope.parcel = {}; // Clear the form
            }, function(error) {
                $scope.parcelMessage = 'Error booking parcel.';
                console.error(error);
            });
        };
    }]);
