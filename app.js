angular.module('ePostalApp', [])
.controller('ParcelController', ['$scope', '$http', function($scope, $http) {
    const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    $scope.parcel = {};
    $scope.bookingMessage = '';

    $scope.bookParcel = function(event) {
        event.preventDefault();

        // Create payment method using Stripe
        stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        }).then(function(result) {
            if (result.error) {
                // Display error if payment method creation fails
                document.getElementById('card-error').textContent = result.error.message;
            } else {
                // Process payment and save parcel booking data
                submitParcelBooking(result.paymentMethod.id);
            }
        });
    };

    function submitParcelBooking(paymentMethodId) {
        // Prepare data to send to the backend
        const parcelData = {
            sender: $scope.parcel.sender,
            recipient: $scope.parcel.recipient,
            address: $scope.parcel.address,
            itemName: $scope.parcel.itemName,
            weight: $scope.parcel.weight,
            paymentMethodId: paymentMethodId // You can store this for future reference
        };

        // Send parcel booking details to JSON server
        $http.post('http://localhost:3000/Bookings', parcelData).then(function(response) {
            $scope.bookingMessage = 'Parcel booked successfully!';
        });
    }
}]);