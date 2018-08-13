$(document).ready(function() {
	$('#finishPreparingData').click(function() {
		$('#stepTwo').hide();
		$('#stepThree').show();
	});

	$('#backToStep1').click(function() {
		window.location.href = './index.html';
	});

	$('#clickWebdiskLA').click(function() {
		$('.stepdiv').hide();
		$('.pigsaviordiv').hide();
		$('#webdiskAnalysisSIMU').hide();
		$('#webdiskAnalysisLA').show();
	});

	$('#clickWebdiskSIMU').click(function() {
		$('.stepdiv').hide();
		$('.pigsaviordiv').hide();
		$('#webdiskAnalysisLA').hide();
		$('#webdiskAnalysisSIMU').show();
	});

	$('#clickPigsaviorNPC').click(function() {
		$('.stepdiv').hide();
		$('.webdiskdiv').hide();
		$('#pigsaviorAnalysisMIS').hide();
		$('#pigsaviorAnalysisNPC').show();
	});

	$('#clickPigsaviorMIS').click(function() {
		$('.stepdiv').hide();
		$('.webdiskdiv').hide();
		$('#pigsaviorAnalysisNPC').hide();
		$('#pigsaviorAnalysisMIS').show();
	});
});