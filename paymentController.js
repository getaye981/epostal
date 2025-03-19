app.controller('paymentController', function($scope, paymentService) {
    $scope.paymentDetails = {
        cardNumber: '',
        amount: null
    };

    $scope.paymentStatus = '';

    $scope.makePayment = function() {
        $scope.paymentStatus = 'Processing...';

        paymentService.processPayment($scope.paymentDetails)
            .then(function(response) {
                $scope.paymentStatus = response.message;
            })
            .catch(function(error) {
                $scope.paymentStatus = error.message;
            });
    };
});
