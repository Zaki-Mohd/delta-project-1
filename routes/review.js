const express = require('express');
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedin,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")

// Post Review
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));

// Delete Review
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;