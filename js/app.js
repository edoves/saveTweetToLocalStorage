class Tweet {

    constructor() {
        this.tweetList = document.querySelector('#tweet-list ul');
        this.removeTweet();
    }

    newTweet() {
        const tweet = document.getElementById('tweet');

        if (tweet.value.length > 0) {
            // create an <li> tag
            const li = document.createElement('li');
            li.textContent = tweet.value;
            li.classList = 'list-group-item';

            if (li.classList.contains('list-group-item')) {
                setTimeout(() => {
                    li.classList.add('list-show');
                }, 100)
            }

            // create an <a> tag as a remove button
            const removeBtn = document.createElement('a');
            removeBtn.classList = 'remove-tweet';
            removeBtn.textContent = 'X';

            li.appendChild(removeBtn);

            this.tweetList.appendChild(li);

            // function call for storing tweet to local storage
            StoreTweet.addTweetToLocalStorage(tweet.value);

            this.errorMessage('Tweet Added', 'alert-success');

            tweet.value = '';

        } else {
            this.errorMessage('Please write a tweet', 'alert-danger');
        }

    }

    removeTweet() {
        this.tweetList.addEventListener('click', (e) => {
            // console.log(e.target.classList.contains('remove-tweet'))
            if (e.target.classList.contains('remove-tweet')) {
                const tweetItem = e.target.parentElement;
                tweetItem.classList.remove('list-show');

                setTimeout(() => {
                    tweetItem.remove();
                }, 1000);

                StoreTweet.removeTweeFromLocalStorage(tweetItem.textContent);

            }
        });
    }

    errorMessage(message, className) {
        const div = document.createElement('div');
        div.classList = `alert ${className} text-center`;
        div.textContent = message;

        document.querySelectorAll('.col-lg-12 ')[0].insertBefore(div, document.getElementById('form'));

        setTimeout(() => {
            if (div.classList[0] === 'alert') {
                div.remove(div);
            }
        }, 2000);

    }

}

class StoreTweet {
    static getTweerFromLocalStorage() {
        let tweet;
        if (localStorage.getItem('tweet') === null) {
            tweet = []
        } else {
            tweet = JSON.parse(localStorage.getItem('tweet'));
        }

        return tweet;
    }

    static addTweetToLocalStorage(tweet) {
        const tweets = StoreTweet.getTweerFromLocalStorage();

        tweets.push(tweet)

        localStorage.setItem('tweet', JSON.stringify(tweets))
    }

    static displayTweeFromLocalStorage() {
        const tweets = StoreTweet.getTweerFromLocalStorage();
        const tweetList = document.querySelector('#tweet-list ul');


        tweets.forEach(tweet => {
            // create an <li> tag
            const li = document.createElement('li');
            li.textContent = tweet;
            li.classList = 'list-group-item';
            li.classList.add('list-show');

            // create an <a> tag as a remove button
            const removeBtn = document.createElement('a');
            removeBtn.classList = 'remove-tweet';
            removeBtn.textContent = 'X';

            li.appendChild(removeBtn);
            // console.log(li)

            tweetList.appendChild(li);
        });
    }

    static removeTweeFromLocalStorage(tweetItemText) {
        const tweets = StoreTweet.getTweerFromLocalStorage();

        const sliceTheLastChar = tweetItemText.substring(0, tweetItemText.length - 1);
        console.log(sliceTheLastChar)

        tweets.forEach((tweet, index) => {
            if (tweet === sliceTheLastChar) {
                tweets.splice(index, 1)
            }

        });

        localStorage.setItem('tweet', JSON.stringify(tweets));

    }
}

const tweet = new Tweet();




document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    tweet.newTweet();
})

// function to diplay tweet save in local storage
document.addEventListener('DOMContentLoaded', () => {
    StoreTweet.displayTweeFromLocalStorage();
});
