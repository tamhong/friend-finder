var friendsData = require("../data/friends");


module.exports = function (app) {
    
    app.get("/api/friends", function (req, res) {
        return res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        var newBestFriend = {
            name: "",
            link: "",
            dif: 1000
        }
        var newUserData = req.body;
        for (var i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i]
            var totalDif = 0;
            for (var j=0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var newUserDataScore = newUserData.scores[j];
                totalDif += Math.abs(parseInt(newUserDataScore) - parseInt(currentFriendScore));
            }

            if (totalDif <= newBestFriend.dif) {
                newBestFriend.name = currentFriend.name;
                newBestFriend.link = currentFriend.photo;
                newBestFriend.dif = totalDif;
            }

        }

        friendsData.push(newUserData);

        console.log ("From the back end", newBestFriend);

        res.json(newBestFriend);
 
    });
}