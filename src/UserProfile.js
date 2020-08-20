//A wrapper to manage user session

var UserProfile = (function () {
    var full_name = "";
    var id = "";
    var role = "";

    var getName = function () {
        return full_name;    
    };
    var getId = function () {
        return id;
    };
    var getRole = function () {
        return role;
	}

    var setSession = function (userId, name, userRole) {
        id = userId;
        full_name = name;
        role = userRole;
    };

    var clearSession = function () {
        id = "";
        full_name = "";
        role = "";
	}

    return {
        getName: getName,
        getId: getId,
        getRole: getRole,
        setSession: setSession,
        clearSession: clearSession
    }

})();

export default UserProfile;