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

    return (Math.round(rating * 10) / 10).toFixed(1);
}