console.log("[Monitor] "+ monitor+'\n');
console.log("En écoute de racistes ... \n");
client.stream('statuses/filter', {track: monitor}, function(stream) {
  stream.on('data', function(event) {

    var tweetId = event.id_str;
    var user = event.user.screen_name;
    var tweet = event.text;
    console.log("Tweet potentiellement raciste detecte : "+ tweet);

    if(tweet.toLowerCase().indexOf(monitor) != -1 && user!="BotAntiraciste"){
      console.log("Tweet raciste detecte!");
      console.log(event.user.screen_name + '( id : '+tweetId+' ) : ' + event.text);

      client.post('statuses/update', {status: '@'+user+' Si tu l\'es, raciste va !!! #BotAntiraciste « '+event.text+' »', in_reply_to_status_id: tweetId}, function(error, tweet, response) {
        if (!error) {
          console.log('Réponse envoyee! Paf dans ta gueule le raciste \n');
        }
      });
    }else{
      console.log("fausse alerte ... \n");
    }

  });

  stream.on('error', function(error) {
    throw error;
  });
});
