'use strict';
angular.module('confusionApp', [])
        .controller('MenuController', ['$scope','menuFactory',  function($scope,menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= menuFactory.getDishes();
            $scope.dish= menuFactory.getDish(3);
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }]) 

        .controller('FeedbackController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory){
            var dish= menuFactory.getDish(parseInt($routeParams.id,10));
            $scope.dish= dish;
            
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.feedback = {author:"",rating:0,comment:"",date:""};
            $scope.invalidChannel= false;
            $scope.submitComment = function() {
                
                console.log($scope.feedback);                    
                    $scope.feedback.date=new Date().toISOString();
                    $scope.feedback.rating*=1;
                    $scope.dish.comments.push($scope.feedback);
                    $scope.invalidChannel= false;
                    $scope.feedback = {author:"",rating:0,comment:"",date:""};
                    $scope.commentForm.$setPristine();
                    console.log($scope.feedback);

            };
                //Step 4: reset your form to pristine
                
                //Step 5: reset your JavaScript object that holds your comment
//            }
        }])