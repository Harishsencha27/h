$(function(){
	$(document).on('click', '.like-review', function(e) {
		$(this).html('<i class="fa fa-heart" aria-hidden="true"></i> You voted for this');
		$(this).children('.fa-heart').addClass('animate-like');
	});
});