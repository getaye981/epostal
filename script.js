var app = angular.module('ePostalApp', []);

app.controller('MainController', function($scope) {
    $scope.aboutText = "Our e-Postal service provides a seamless, digital experience for sending and receiving packages securely.";

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
        $scope.parcelMessage = "Parcel booked successfully for " + $scope.parcel.recipient + "!";
    };

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
