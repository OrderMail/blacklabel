'use strict';

angular.module('mean.users').factory('MeanUser', [

  function() {
    return {
      name: 'users'
    };
  }
])
/*Service to get and set the current user, Need to check the else part and correct the deferred*/
.service('LoggedinUser', ['$http','$q','$timeout',
function ($http,$q,$timeout)
{
	var user='0';

	return {
            getUser: function () {
            	console.log('In Getting User');
            	if(user!=='0')
            	{
            		console.log('Going to return User');
                return user;
            	}
            else
            	{
            		var deferred = $q.defer();
            		console.log('Else block, going to get the user');
            		$http.get('/loggedin').success(function(retrievedUser){
							$timeout(deferred.resolve); 
							user=deferred.promise;
					
					});
					return user;
				}
            },
            setUser: function(value) {
                user = value;
            }
        };
    }

	/*
	$http.get('/loggedin').success(function(user){
		return user;*/
	/*})

}*/

	]);

