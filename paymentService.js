var app = angular.module('ePostalApp', []);

app.service('paymentService', function($http, $q) {
    var baseUrl = 'http://localhost:3000';

    // Fetch user details based on card number
    this.getUserByCard = function(cardNumber) {
        return $http.get(baseUrl + '/users?cardNumber=' + cardNumber)
            .then(response => response.data.length ? response.data[0] : null);
    };

    // Process mock payment
    this.processPayment = function(paymentDetails) {
        var deferred = $q.defer();

        this.getUserByCard(paymentDetails.cardNumber).then(user => {
            if (!user) {
                deferred.reject({ status: "error", message: "User not found!" });
                return;
            }

            if (user.balance < paymentDetails.amount) {
                deferred.reject({ status: "error", message: "Insufficient balance!" });
                return;
            }

            // Deduct amount from balance
            user.balance -= paymentDetails.amount;

            // Update user balance
            $http.put(baseUrl + '/users/' + user.id, user).then(() => {
                // Create a transaction record
                $http.post(baseUrl + '/transactions', {
                    userId: user.id,
                    amount: paymentDetails.amount,
                    date: new Date().toISOString(),
                    status: "Success"
                }).then(() => {
                    deferred.resolve({ status: "success", message: "Payment successful!" });
                });
            });
        }).catch(() => {
            deferred.reject({ status: "error", message: "Payment failed!" });
        });

        return deferred.promise;
    };
});
