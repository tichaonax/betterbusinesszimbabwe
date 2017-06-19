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

export const getMedia = (breakpoint) => {
    if (breakpoint.isExtraSmall) {
        return ("xs")
    } else if (breakpoint.isSmall) {
        return ("sm")
    } else if (breakpoint.isMedium) {
        return ("md")
    } else if (breakpoint.isLarge) {
        return ("lg")
    } else if (breakpoint.isExtraLarge) {
        return ("xl")
    }
}

export const getMediaContainerClass = (breakpoint) => {
    if (breakpoint.isExtraSmall) {
        return ("container-fluid")
    } else if (breakpoint.isSmall) {
        return ("container-fluid")
    } else if (breakpoint.isMedium) {
        return ("container-fluid")
    } else if (breakpoint.isLarge) {
        return ("container")
    } else if (breakpoint.isExtraLarge) {
        return ("container")
    } else return ("container")
}