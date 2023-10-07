var myApp = angular.module("myApp", ['ui-notification', 'ngRoute', 'ngAnimate', 'ngDialog']);

myApp.factory('MailService', function ($http, ngDialog) {
    Mailservice = {};

    Mailservice.Mail = function (Contact) {
        var mail;

        mail = $http({ method: 'POST', url: '/Contactus/Create/', data: Contact }).
         then(function (response) {
             return response.data;
         });

        return mail;
    };
   
    return Mailservice;
});

myApp.config(function ($routeProvider) {
    $routeProvider.when('/Home', {
        templateUrl: 'Template/Common/Home.html',
        controller: 'mainController'
    });
    $routeProvider.when('/Courses', {
        templateUrl: 'Template/Common/courses.html',
        controller: 'aboutController'
    });
    $routeProvider.when('/Charges', {
        templateUrl: 'Template/Common/charges.html',
        controller: 'contactController'

    });
    $routeProvider.when('/ContactUs', {
        templateUrl: 'Template/Common/Contactus.cshtml'
    });
    $routeProvider.otherwise({
        redirectTo: '/Home'
    });
    //$locationProvider.html5Mode(true);

});

myApp.controller('mainController', function ($scope) {
    $scope.pageClass = 'page-home';
});

myApp.controller('aboutController', function ($scope) {
    $scope.pageClass = 'page-about';
});


myApp.controller('contactController', function ($scope, MailService, Notification,$location) {
    $scope.pageClass = 'page-contact';

    var deafualtForm = {
        Country: '',
        Phone: ''
    }

    $scope.reset = function (Contact) {
        $scope.Contact = angular.copy(deafualtForm);
    }
    $scope.MailedService = function (Contact, isValid,str) {


        if (isValid) {

            MailService.Mail(Contact).then(function (result) {

                Notification.success({ message: 'Thank you for showing your interest to our website.We will contact you very soon <br>Message is <b>successfully sent !</b><br><br><img src="../images/bd04914_.jpg">', title: 'Contact Us Form', delay: 10000 });
                $scope.reset(Contact);
                $location.path(str);
                
            });
           

        }
        else {

            Notification.error({ message: 'All fields are required !', delay: 10000 });

        }

    };
});


