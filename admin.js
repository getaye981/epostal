angular.module('ePostalApp', [])
.controller('MainController', ['$scope', '$http', function($scope, $http) {
    // Fetch bookings and users from db.json
    $http.get('db.json')
        .then(function(response) {
            $scope.bookings = response.data.bookings || [];
            $scope.users = response.data.users || [];
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Check console for details.');
        });

    // Update booking status
    $scope.updateStatus = function(trackingNumber, status) {
        const booking = $scope.bookings.find(b => b.tracking_number === trackingNumber);
        if (booking) {
            booking.status = status;
            alert('Status of ' + trackingNumber + ' updated to ' + status);
        }
    };

    // Delete booking
    $scope.deleteBooking = function(trackingNumber) {
        const index = $scope.bookings.findIndex(b => b.tracking_number === trackingNumber);
        if (index !== -1) {
            $scope.bookings.splice(index, 1);
            alert('Shipment ' + trackingNumber + ' deleted');
        }
    };

    // Delete user
    $scope.deleteUser = function(email) {
        const index = $scope.users.findIndex(u => u.email === email);
        if (index !== -1) {
            $scope.users.splice(index, 1);
            alert('User ' + email + ' deleted');
        }
    };
}]);

