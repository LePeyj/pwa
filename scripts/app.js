/*global angular, document, window */
(function () {
  'use strict';
  
  var app = angular.module('angular_post_demo', []);
  app.controller('sign_up', function ($scope, $http) {
    /*
    * This method will be called on click event of button.
    * Here we will read the email and password value and call our PHP file.
    */
    $scope.check_credentials = function () {

      document.getElementById("message").textContent = "";

      var request = $http({
        method: "post",
        url: "https://localhost/projects/inventory%20tracking%20system/php/loginController.php",
        data: {
          username: $scope.username,
          pass: $scope.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });

      /* Check whether the HTTP Request is successful or not. */
      request.then(function (data) {
        if(data['data'] == 'success') {
          document.getElementById("message").textContent = "You have login successfully!";
        } else {
          document.getElementById("message").textContent = "Username/Password in invalid!";
        }
        console.log(data);
      });
    }
  });
}());
