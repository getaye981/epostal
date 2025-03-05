var app = angular.module("ePostalApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html",
            controller: "MainController"
        })
        .when("/about", {
            templateUrl: "about.html",
            controller: "MainController"
        })
        .when("/services", {
            templateUrl: "services.html",
            controller: "MainController"
        })
        .when("/parcel", {
            templateUrl: "parcel.html",
            controller: "MainController"
        })
        .when("/tracking", {
            templateUrl: "tracking.html",
            controller: "MainController"
        })
        .when("/contact", {
            templateUrl: "contact.html",
            controller: "MainController"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller('MainController', function($scope) {
   

    $scope.services = [
        { name: "Fast Delivery", description: "We ensure quick delivery of your parcels anywhere." },
        { name: "Package Tracking", description: "Track your shipment in real-time with our advanced tracking system." },
        { name: "Secure Shipping", description: "Guaranteed safety for your packages with secure handling." }
    ];

    $scope.user = {};
    $scope.message = "";
    $scope.registerUser = function() {
        $scope.message = "Thank you for registering, " + $scope.user.name + "!";
    };

    $scope.parcel = {};
    $scope.parcelMessage = "";

    $scope.bookParcel = function() {
        $scope.parcelMessage = "Parcel booked successfully for " + $scope.parcel.recipient + "! Please proceed with the payment.";
    };

    // Stripe Payment Integration
    var stripe = Stripe("4242"); // Replace with your Stripe API Key

    document.getElementById("payButton").addEventListener("click", function () {
        // Make a request to the backend to create a checkout session
        $http.post("/create-checkout-session", {}).then(function(response) {
            return stripe.redirectToCheckout({ sessionId: response.data.id });
        }).catch(function(error) {
            console.error("Error:", error);
            alert("Payment error! Check console.");
        });
    });
    $scope.trackingStatus = "";
    $scope.trackParcel = function() {
        $scope.trackingStatus = "Tracking Number: " + $scope.trackingNumber + " - Status: In Transit.";
    };

    $scope.contact = {};
    $scope.contactResponse = "";
    $scope.sendMessage = function() {
        $scope.contactResponse = "Message sent successfully! We'll get back to you soon.";
    };
    
});