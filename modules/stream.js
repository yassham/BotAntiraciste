console.log("[Monitor] "+ monitor);
console.log("En écoute de racistes ...");
client.stream('statuses/filter', {track: monitor}, function(stream) {
  stream.on('data', function(event) {
    var tweetId = event.id_str;
    var user = event.user.screen_name;

    console.log(event.user.screen_name + '( id : '+tweetId+' ) : ' + event.text);

    client.post('statuses/update', {status: '@'+user+' Si tu l\'es ! Raciste va !!! #BotAntiraciste',in_reply_to_status_id: tweetId}, function(error, tweet, response) {
      if (!error) {
        console.log('Réponse envoyee! Paf dans ta gueule le raciste');
      }
    });

    console.log(event.user.screen_name);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
