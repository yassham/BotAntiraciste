console.log("[Monitor] "+ monitor+'\n');

client.stream('statuses/filter', {track: monitor}, function(stream) {
  console.log("En ecoute de racistes ... \n");
  stream.on('data', function(event) {

    var monitored = monitor.split(',');
    var tweetId = event.id_str;
    var user = event.user.screen_name;
    var tweet = event.text;
    var maxTweetLength = 140;

    var BaseTweetLength = '@ Si tu l\'es, raciste va !!! #BotAntiraciste RT: «  »'.length + user.length;
    var RTLength = maxTweetLength - BaseTweetLength;

    if(user!="BotAntiraciste"){
      console.log("/************************************************\n");

      console.log("[APP] Tweet potentiellement raciste detecte. " + user + ' : ' + tweet);

      // On vérifie que le tweet detecte respecte les phrases du monitoring
      for(i = 0; i<monitored.length; i++){
        console.log("\n[Monitor] "+monitored[i]);


        // Ici un tweet correspond à la recherche il est donc "raciste"
        if(tweet.toLowerCase().indexOf(monitored[i]) != -1 && user!="BotAntiraciste"){
          console.log("Tweet raciste detecte!\n");
          console.log(user+ '( id : '+tweetId+' ) : ' + event.text);

          if(monitored[i] == "je suis raciste"){
            var BaseTweetLength = '@ raciste va !!! #BotAntiraciste RT: «  »'.length + user.length;
            var RTLength = maxTweetLength - BaseTweetLength;
          }else{
            var BaseTweetLength = '@ Si tu l\'es, raciste va !!! #BotAntiraciste RT: «  »'.length + user.length;
            var RTLength = maxTweetLength - BaseTweetLength;
          }
          console.log(toTweet);

          // On verifie que le tweet raciste a cite n'est pas trop long, sinon on le coupe est on ajoute ... à la fin de la sitation
          if(tweet.length > RTLength){
            console.log("tweet trop long...");
            var tweet = tweet.substring(0, RTLength-3)+'...';
            console.log("taille du tweet :"+tweet.length);
            //console.log("nouveau tweet = " +tweet);
            //console.log("taille : " + (tweetLength+tweet.length));
          }

          if(monitored[i] == "je suis raciste"){
            var toTweet ='Raciste va !!! #BotAntiraciste RT: @'+user+'« '+tweet+' »';
          }else{
            var toTweet ='Si tu l\'es, raciste va !!! #BotAntiraciste RT: @'+user+' « '+tweet+' »';
          }

          // On répond au tweet incriminé tout en respectant les 140 caracteres
          client.post('statuses/update', {status: toTweet, in_reply_to_status_id: tweetId}, function(error, tweet, response) {
            if (!error) {
              console.log('Réponse envoyee! Paf dans ta gueule le raciste \n');
            }
          });
        }else{
          console.log("fausse alerte ... \n");
        }
      }

      console.log("************************************************/");
    }
  });

  stream.on('error', function(error) {
    throw error;
  });
});
