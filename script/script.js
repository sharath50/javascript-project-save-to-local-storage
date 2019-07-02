// variables..................

const tweetList = document.querySelector('#tweet-list');








// event listeners...................

eventListeners();

function eventListeners() {
    // tweet clicks
    document.querySelector("#form").addEventListener('submit' , tweetFunction );
    
    // remove clicks
    tweetList.addEventListener( 'click' , removeTweet );
    
    // delete all tweets...
    document.querySelector('#delete').addEventListener('click' , deleteFunction );
    
    // to get all tweets when we loaded the page..
    document.addEventListener('DOMContentLoaded' , loadTweetsOnPage );
    
}




// functions....................

function tweetFunction(e) {
        e.preventDefault();

        // collecting tweet
        let tweet = document.querySelector('#tweet').value;
        document.querySelector('#tweet').value = "";
    
    	if (tweet !== "") {
			// creating a remove button
			let removeBtn = document.createElement('a');
			removeBtn.classList = "remove-btn";
			removeBtn.textContent = "X";

			// create element li
			let li = document.createElement('li');
			li.classList = "list-item w-75";
			li.textContent = tweet;

			// append remove button to li
			li.appendChild(removeBtn);

			//appending li to list
			tweetList.appendChild(li);

			// get tweets into localstorage
        	addTweetsLs(tweet);
    	}
    }

// removing tweet

function removeTweet(i) {
	// tweet remove button for the page
    if (i.target.classList.contains('remove-btn')) {
        i.target.parentElement.remove();
    }

    // remove tweet from the localstotage
    removeTweetfromLs(i.target.parentElement.textContent);
}


// get tweets from the localstorage

function addTweetsLs(tweet) {
    let tweets = getTweetsLs();
    
    // insert tweets into array
    tweets.push(tweet);
    
    // converting array into string
    localStorage.setItem('tweets' , JSON.stringify(tweets));
}



// adds tweets to the local storage

function getTweetsLs() {
    let tweets;
    const tweetsLS = localStorage.getItem("tweets");
    if (tweetsLS === null){
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    
    return tweets;
}

// to load the tweets on loading the page...

function loadTweetsOnPage() {
    let tweets = getTweetsLs();
    
    tweets.forEach( (tweet) => {
            // creating a remove button
            let removeBtn = document.createElement('a');
            removeBtn.classList = "remove-btn";
            removeBtn.textContent = "X";

            // create element li
            let li = document.createElement('li');
            li.classList = "list-item w-75";
            li.textContent = tweet;

            // append remove button to li
            li.appendChild(removeBtn);

            //appending li to list
            tweetList.appendChild(li);
    });
}


// remove tweets from the local storage...

function removeTweetfromLs(tweet) {
	let tweets = getTweetsLs();

	// taking the tweet except 'X' by using list method
	const tweetDelete = tweet.substring(0 , tweet.length-1);

	// looping through the tweets array
	tweets.forEach((tweetLs , index) => {
		if (tweetDelete === tweetLs) {
			tweets.splice(index , 1);
		}
	});

	localStorage.setItem('tweets', JSON.stringify(tweets));
}

// deletes all tweets from the local storage...

function deleteFunction() {
	let tweets;
    tweets = getTweetsLs();
    tweets = tweets.filter((tweet)=>{
    	return tweet.length == 0;
    })

    localStorage.setItem('tweets' , JSON.stringify(tweets));
}

