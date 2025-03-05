var app = angular.module('ePostalApp', []);

app.controller('MainController', function($scope) {
    $scope.aboutText = "Our e-Postal service provides a seamless, digital experience for sending and receiving packages securely.";

    $scope.services = [
        { name: "Fast Delivery", description: "We ensure quick delivery of your parcels anywhere." },
        { name: "Package Tracking", description: "Track your shipment in real-time with our advanced tracking system." },
        { name: "Secure Shipping", description: "Guaranteed safety for your packages with secure handling." }
    ];
});