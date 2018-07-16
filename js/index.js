$(document).ready(function() {
	$('#finishPreparingData').click(function() {
		$('#stepTwo').hide();
		$('#stepThree').show();
	});

	$('#backToStep1').click(function() {
		window.location.href = './index.html';
	});

	$('#clickWebdiskSingle').click(function() {
		$('.stepdiv').hide();
		$('.pigsaviordiv').hide();
		$('#webdiskAnalysisGroup').hide();
		$('#webdiskAnalysisSingle').show();
	});

	$('#clickWebdiskGroup').click(function() {
		$('.stepdiv').hide();
		$('.pigsaviordiv').hide();
		$('#webdiskAnalysisSingle').hide();
		$('#webdiskAnalysisGroup').show();
	});

	$('#clickPigsaviorSingle').click(function() {
		$('.stepdiv').hide();
		$('.webdiskdiv').hide();
		$('#pigsaviorAnalysisGroup').hide();
		$('#pigsaviorAnalysisSingle').show();
	});

	$('#clickPigsaviorGroup').click(function() {
		$('.stepdiv').hide();
		$('.webdiskdiv').hide();
		$('#pigsaviorAnalysisSingle').hide();
		$('#pigsaviorAnalysisGroup').show();
	});
});