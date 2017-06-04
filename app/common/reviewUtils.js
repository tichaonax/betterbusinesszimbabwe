export const getRatingsAverage = (reviewItems) => {

    var ratingCount = reviewItems.length;
    var ratingSum = 0;
    var rating = 0;

    reviewItems.map((reviewItem) => {
        ratingSum = ratingSum + reviewItem.rating;
    });

    if (ratingCount > 0) {
        rating = ratingSum / ratingCount;
    }

    return rating;
}

export const getRatingRoundedToHalf = (rating) => {
    return (Math.floor(rating) + ( Math.round((rating - Math.floor(rating))) ? 0.5 : 0.0 ));
}