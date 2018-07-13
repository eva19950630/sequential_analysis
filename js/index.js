$(document).ready(function() {
	$('#createCode').click(function() {
		$('#deleteCode').show();
	});

	$('#finishPreparingData').click(function() {
		$('#stepTwo').hide();
		$('#stepThree').show();
	});

	$('#backToStep1').click(function() {
		window.location.href = './index.html';
	});
	
	$('#clickWebdisk').click(function() {
		$('.stepdiv').hide();
		$('#pigsaviorAnalysis').hide();
		$('#webdiskAnalysis').show();
	});

	$('#clickPigsavior').click(function() {
		$('.stepdiv').hide();
		$('#webdiskAnalysis').hide();
		$('#pigsaviorAnalysis').show();
	});
});