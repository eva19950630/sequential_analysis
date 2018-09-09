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
		$('#webdiskAnalysisGPR_grade').hide();
		$('#webdiskAnalysisLA').show();
	});

	$('#clickWebdiskSIMU').click(function() {
		$('.stepdiv').hide();
		$('.pigsaviordiv').hide();
		$('#webdiskAnalysisLA').hide();
		$('#webdiskAnalysisGPR_grade').hide();
		$('#webdiskAnalysisSIMU').show();
	});

	$('#clickWebdiskGRP_grade').click(function() {
		$('.stepdiv').hide();
		$('.pigsaviordiv').hide();
		$('#webdiskAnalysisLA').hide();
		$('#webdiskAnalysisSIMU').hide();
		$('#webdiskAnalysisGPR_grade').show();
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